import { rgba } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 18rem;
  position: absolute;
  background: ${({ theme }) => rgba(theme.colors.primary400, 0.95)};
  border-radius: 8px;
  top: 5rem;
  left: 0;
  padding: 1rem;
  margin: 1rem;
  transition: background ease 0.3s, left ease 0.3s 0.3s, transform ease 0.3s;
  &.disabled {
    left: -20rem;
  }
  nav {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    button {
      display: block;
      height: 4rem;
      padding: 0 1rem;
      position: relative;
      display: flex;
      align-items: center;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.primary300};
      background: transparent;
      border: 0;
      &.active::before {
        content: '';
        height: 100%;
        background: ${({ theme }) => theme.colors.secondary100};
        width: 3px;
        top: 0;
        left: 0;
        position: absolute;
        border-radius: 0 3px 3px 0;
      }
      &:hover {
        color: ${({ theme }) => theme.colors.primary100};
      }
      &.active {
        color: ${({ theme }) => theme.colors.primary100};
      }
    }
  }
`;
