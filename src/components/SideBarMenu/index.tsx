import Link from 'next/link';
import { useRouter } from 'next/router';

import { SignInButton } from '../SignInButton';
import { Container } from './styled';
import { SetStateAction, useEffect } from 'react';
import { ActiveLink } from '../ActiveLink';

interface ISideBarMenu {
  isToggleMenu: boolean;
  setIsToggleMenu?: (value: SetStateAction<boolean>) => void;
}

export function SideBarMenu({ isToggleMenu, setIsToggleMenu }: ISideBarMenu) {
  function toggleMenu() {
    setIsToggleMenu(false);
  }

  return (
    <>
      <Container className={!isToggleMenu ? 'disabled' : ''}>
        <nav>
          <ActiveLink href="/" activeClassName="active">
            <button onClick={toggleMenu}>home</button>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName="active">
            <button onClick={toggleMenu}>posts</button>
          </ActiveLink>
        </nav>
        <SignInButton />
      </Container>
    </>
  );
}
