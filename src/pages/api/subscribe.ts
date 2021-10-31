import { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/client';
import { query as q } from 'faunadb';
import { stripe } from '../../services/stripe';
import { faunadb } from '../../services/faunadb';

interface IFaunaDBUserResponse {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
}

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const session = await getSession({ req: request });

    const findUser = await faunadb.query<IFaunaDBUserResponse>(
      q.Get(q.Match(q.Index('user_by_email'), q.Casefold(session.user.email)))
    );

    let customerId = findUser.data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: session.user.email,
      });

      await faunadb.query(
        q.Update(q.Ref(q.Collection('users'), findUser.ref.id), {
          data: {
            stripe_customer_id: stripeCustomer.id,
          },
        })
      );

      customerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,

      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: process.env.STRIPE_API_PRICING_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_URL_SUCCESS,
      cancel_url: process.env.STRIPE_URL_CANCEL,
    });
    return response.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    response.setHeader('Allow', 'POST');
    response.status(405).end('Method not allowed');
  }
};
