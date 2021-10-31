import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { useCustomTheme } from '../../hooks/useCustomTheme';

import { signIn, signOut, useSession } from 'next-auth/client';

import { Container } from './styled';

export function SignInButton() {
  const { customTheme } = useCustomTheme();

  const [session] = useSession();

  function handleSignInGithub() {
    signIn('github');
  }

  function handleSignOutGithub() {
    signOut();
  }

  return (
    <>
      {session ? (
        <Container onClick={handleSignOutGithub}>
          <FaGithub className="github" style={{ color: customTheme.colors.secondary300 }} />
          <span className="profile">{session.user.name}</span>
          <FiX className="close" />
        </Container>
      ) : (
        <Container onClick={handleSignInGithub}>
          <FaGithub className="github" style={{ color: customTheme.colors.secondary100 }} />
          <span className="profile">Sign in with Github</span>
        </Container>
      )}
    </>
  );
}
