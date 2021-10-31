import { GetStaticProps } from 'next';
import { SubscribeButton } from '../components/SubscribeButton';
import { GlobalSection } from '../global/styled';
import { stripe } from '../services/stripe';
import { formatCurrencyValue } from '../supports/formatCurrencyValue';
import { Container } from './styled';

interface IStripeProduct {
  product: {
    // priceId: string;
    amount: number;
  };
}

export default function Home({ product }: IStripeProduct) {
  return (
    <>
      <GlobalSection>
        <Container>
          <main>
            <span>👏 Hey, Welcome</span>
            <h1>
              New about the <span>React</span> world.
            </h1>
            <p>
              Get access to all the publications <br />
              <span>for {product.amount} month</span>
            </p>
            <SubscribeButton />
          </main>
          <img src="/images/avatar.svg" alt="Girl coding" />
        </Container>
      </GlobalSection>
    </>
  );
}

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
