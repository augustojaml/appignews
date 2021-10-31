import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '../../services/stripe';
import { ManageSubscription } from './_lib/ManageSubscription';

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const buf = await buffer(request);
    const secret = request.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      response.status(400).end(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        if (type === 'checkout.session.completed') {
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          ManageSubscription.saveSubscription({
            subscriptionId: checkoutSession.subscription.toString(),
            customerId: checkoutSession.customer.toString(),
            createAction: true,
          });
        } else if (type === 'customer.subscription.updated' || type === 'customer.subscription.deleted') {
          const subscription = event.data.object as Stripe.Subscription;

          ManageSubscription.saveSubscription({
            subscriptionId: subscription.id,
            customerId: subscription.customer.toString(),
            createAction: false,
          });
          response.json({ received: true });
        } else {
          throw new Error('Unhandled event');
        }
      } catch {
        return response.json({ error: 'Webhook handle filed' });
      }
    }
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed');
  }
};
