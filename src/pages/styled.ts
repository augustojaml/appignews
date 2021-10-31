import styled from 'styled-components';
import { breakPointMobile, contentSize } from '../global/theme';

export const Container = styled.div`
  max-width: ${contentSize};
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  main {
    > span {
      font-size: 1.5rem;
      font-weight: bold;
    }

    h1 {
      font-size: 4.5rem;
      line-height: 4.5rem;
      font-weight: 900;
      margin-top: 2.5rem;

      span {
        color: ${({ theme }) => theme.colors.secondary200};
      }
    }

    p {
      font-size: 1.5rem;
      line-height: 2.25rem;
      margin-top: 1.5rem;

      span {
        color: ${({ theme }) => theme.colors.secondary200};
        font-weight: bold;
      }
    }
  }

  @media (max-width: ${breakPointMobile}) {
    flex-direction: column;
    align-items: center;
    padding: 0 2rem;
    text-align: center;
    height: auto;
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      > span,
      p {
        font-size: 1.2rem;
      }
      h1 {
        font-size: 2.5rem;
        line-height: 2.5rem;
      }
    }
    img {
      width: 45%;
      margin-top: 0;
    }
  }
`;
