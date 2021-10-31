import styled from 'styled-components';

export const Container = styled.button`
  background: transparent;
  /* background: ${({ theme }) => theme.colors.secondary100}; */
  border-radius: 8px;
  cursor: pointer;
  display: block;
  height: 24px;
  margin-left: -16px;
  margin-right: 1rem;
  padding: 16px;
  width: 24px;
  position: relative;
  z-index: 200;
  border: 0;
  .menu,
  .menu::before,
  .menu::after {
    background: ${({ theme }) => theme.colors.secondary100};
    content: '';
    display: block;
    height: 2px;
    position: absolute;
    transition: background ease 0.3s, top ease 0.3s 0.3s, transform ease 0.3s;
    width: 20px;
  }

  &:hover .menu,
  &:hover .menu::before,
  &:hover .menu::after {
    background: ${({ theme }) => theme.colors.secondary200};
  }

  .menu {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .menu::before {
    top: -6px;
  }

  .menu::after {
    top: 6px;
  }

  &.active .menu::before {
    transform: rotate(45deg);
  }

  &.active .menu::after {
    transform: rotate(-45deg);
  }

  &.active .menu {
    background: transparent;
  }

  &.active .menu::before,
  &.active .menu::after {
    top: 0;
    transition: top ease 0.3s, transform ease 0.3s 0.3s;
  }
`;
