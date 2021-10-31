import styled from 'styled-components';
import { breakPointMobile, contentSize } from '../../global/theme';

export const Container = styled.header`
  width: 100%;
  height: 5rem;
  background: ${({ theme }) => theme.colors.primary900};
  border: 1px solid ${({ theme }) => theme.colors.primary600};
  position: fixed;
  .content {
    max-width: ${contentSize};
    margin: 0 auto;
    padding: 0 2rem;
    height: 100%;
    display: flex;
    justify-content: space-between;
    .content-menus,
    .content-buttons {
      height: 5rem;
      display: flex;
      align-items: center;
    }

    .content-menus {
      nav {
        margin-left: 5rem;
        height: 5rem;
        a {
          display: inline-block;
          position: relative;
          padding: 0 0.5rem;
          height: 5rem;
          line-height: 5rem;
          color: ${({ theme }) => theme.colors.primary300};
          transition: color 0.3s;

          & + a {
            margin-left: 2rem;
          }

          &:hover {
            color: ${({ theme }) => theme.colors.primary100};
          }

          &.active {
            color: ${({ theme }) => theme.colors.primary100};
            font-weight: bold;
          }

          &.active::after {
            content: '';
            height: 3px;
            border-radius: 3px 3px 0 0;
            width: 100%;
            position: absolute;
            bottom: 1px;
            left: 0;
            background: ${({ theme }) => theme.colors.secondary100};
          }
        }
      }

      @media (max-width: ${breakPointMobile}) {
        nav {
          display: none;
        }
      }

      @media (min-width: ${breakPointMobile}) {
        .toggleMenu {
          display: none;
        }
      }
    }

    .content-buttons {
      @media (max-width: ${breakPointMobile}) {
        button {
          display: none;
        }
      }
    }
  }
`;
