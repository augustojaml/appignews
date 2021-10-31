import { useEffect, useState } from 'react';
import Link from 'next/link';

import { ActiveLink } from '../ActiveLink';
import { SideBarMenu } from '../SideBarMenu';
import { SignInButton } from '../SignInButton';
import { ToggleMenu } from '../ToggleMenu';
import { ToggleTheme } from '../ToggleTheme';
import { Container } from './styled';

export function Header() {
  const [isToggleMenu, setIsToggleMenu] = useState(false);

  const [screenWidth, setScreenWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 0;
  });

  function handleToggleMenu() {
    setIsToggleMenu(!isToggleMenu);
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (typeof window !== 'undefined') {
        setScreenWidth(window.innerWidth);
      }
    });
    setIsToggleMenu(false);
  }, [screenWidth]);

  return (
    <>
      <Container>
        <div className="content">
          <div className="content-menus">
            <ToggleMenu isToggleMenu={isToggleMenu} handleToggleMenu={handleToggleMenu} />
            <h1>
              <Link href="/">IG.NEWS</Link>
            </h1>
            <nav>
              <ActiveLink href="/" activeClassName="active">
                <a>home</a>
              </ActiveLink>
              <ActiveLink href="/posts" activeClassName="active">
                <a>posts</a>
              </ActiveLink>
            </nav>
          </div>
          <div className="content-buttons">
            <SignInButton />
            <ToggleTheme />
          </div>
        </div>
        <SideBarMenu isToggleMenu={isToggleMenu} setIsToggleMenu={setIsToggleMenu} />
      </Container>
    </>
  );
}
