# STRIPE

- [Link](https://dashboard.stripe.com/)

- Create product => https://dashboard.stripe.com/test/products/create

  - Type product name
  - Type price
  - Mark recurring
  - In Billing period => Monthly
  - Save product
  - Copy Pricing API ID

- Go to Developers | API keys => https://dashboard.stripe.com/test/apikeys

  - Copy Publishable key and Secret key

- Go to Settings | Branding => https://dashboard.stripe.com/settings/branding

  - Config you checkout layout

- Install stripe

  ```bash
  yarn add stripe
  ```

- Create service `src/services/stripe.ts`

  ```ts
  import { Stripe } from 'stripe';

  const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY, {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'ig.news',
      version: '1.0.0',
    },
  });

  export { stripe };
  ```

- Open page for show price product

  ```ts
  export const getStaticProps: GetStaticProps = async () => {
    const productPrice = await stripe.prices.retrieve(process.env.STRIPE_API_PRICING_ID);

    const product = {
      priceId: productPrice.id,
      amount: formatCurrencyValue(productPrice.unit_amount),
    };

    return {
      props: {
        product: product,
      },
    };
  };
  ```

- For continue check the file `src/pages/api/subscribe.ts`;

- Install axios
  ```bash
  yarn add axios
  ```
- Create service `src/services/api.ts`

  ```ts
  import axios from 'axios';

  export const api = axios.create({
    baseURL: '/api',
  });
  ```

- For continue check the file `src/components/SubscribeButton/index.tsx`;

- [Striper cli Docs](https://stripe.com/docs/stripe-cli)
- [Striper cli Github](https://github.com/stripe/stripe-cli)

- After install stripe-cli execute
  ```bash
  stripe login
  ```
- Create file

- Execute bash

  ```bash
  stripe listen --forward-to localhost:3000/api/webhooks
  ```

- Check files `src/pages/api/_lib/ManageSubscription.ts` and `src/pages/api/webhooks.ts`

- Install stripeJS

  ```bash
  yarn add @stripe/stripe-js
  ```

- Create file `src/services/stripeJS.ts`

  ```ts
  import { loadStripe } from '@stripe/stripe-js';

  async function stripeJs() {
    const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_PUBLISHABLE_KEY);
    return stripeJs;
  }

  export { stripeJs };
  ```
