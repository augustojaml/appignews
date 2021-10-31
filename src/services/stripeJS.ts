import { loadStripe } from '@stripe/stripe-js';

export async function stripeJS() {
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_PUBLISHABLE_KEY);
  return stripeJs;
}
