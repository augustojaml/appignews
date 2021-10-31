import { signIn, useSession } from 'next-auth/client';
import { useState } from 'react';
import { useRouter } from 'next/router';

import ReactLoading from 'react-loading';
import { useCustomTheme } from '../../hooks/useCustomTheme';
import { api } from '../../services/api';
import { stripeJS } from '../../services/stripeJS';

import { Container } from './styled';

interface ISubscribeResponse {
  sessionId: string;
}

export function SubscribeButton() {
  const [session] = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const { customTheme } = useCustomTheme();

  async function handleSubscribe() {
    setIsLoading(true);
    if (!session) {
      await signIn('github');
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      const { data } = await api.post<ISubscribeResponse>('/subscribe');
      const stripe = await stripeJS();
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <Container>
          <ReactLoading type="spin" color={customTheme.colors.secondary200} height={30} width={30} />
        </Container>
      ) : (
        <Container onClick={handleSubscribe}>Subscribe now</Container>
      )}
    </>
  );
}
