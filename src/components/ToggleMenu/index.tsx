import { useState } from 'react';
import { Container } from './styled';

interface IToggleMenu {
  handleToggleMenu: () => void;
  isToggleMenu: boolean;
}

export function ToggleMenu({ handleToggleMenu, isToggleMenu }: IToggleMenu) {
  return (
    <>
      <Container onClick={handleToggleMenu} className={`toggleMenu ${isToggleMenu ? 'active' : ''}`}>
        <div className="menu"></div>
      </Container>
    </>
  );
}
