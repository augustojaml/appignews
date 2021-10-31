import { stripe } from '../../../services/stripe';

import { query as q } from 'faunadb';
import { faunadb } from '../../../services/faunadb';

interface ISaveSubscriptionType {
  subscriptionId: string;
  customerId: string;
  createAction: boolean;
}

class ManageSubscription {
  public static async saveSubscription({ subscriptionId, customerId, createAction = false }: ISaveSubscriptionType) {
    const userRef = await faunadb.query(
      q.Select('ref', q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)))
    );
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
      id: subscription.id,
      userId: userRef,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
    };

    try {
      if (createAction) {
        await faunadb.query(q.Create(q.Collection('subscriptions'), { data: subscriptionData }));
      } else {
        await faunadb.query(
          q.Replace(q.Select('ref', q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))), {
            data: subscriptionData,
          })
        );
      }
    } catch (err) {
      return;
    }
  }
}

export { ManageSubscription };
