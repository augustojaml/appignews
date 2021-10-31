// @ts-nocheck
import { linearGradient } from 'polished';
import styled from 'styled-components';
import { breakPointMobile } from '../../global/theme';

export const Container = styled.main`
  > article {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 2rem;
    h1 {
      font-size: 3.5rem;
      font-weight: 900;
    }
    time {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.primary300};
      margin-top: 1.5rem;
      display: block;
    }
    .postContent {
      margin-top: 2rem;
      line-height: 2rem;
      font-size: 1.125rem;
      color: ${({ theme }) => theme.colors.primary100};
      p,
      ul {
        margin: 1.5rem 0;
      }
      ul {
        padding-left: 1.5rem;
        li {
          margin: 0.5rem 0;
        }
      }
    }

    .previewContent {
      background: ${({ theme }) =>
        linearGradient({
          colorStops: [theme.colors.primary100, 'transparent'],
          fallback: theme.colors.primary100,
        })};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .continueReading {
      padding: 2rem;
      text-align: center;
      background: ${({ theme }) => theme.colors.primary300};
      border-radius: 100px;
      font-size: 1.25rem;
      font-weight: bold;
      margin: 4rem 0 2rem;
      transition: text-decoration 0.3s;
      &:hover a {
        text-decoration: underline;
      }
      a {
        color: ${({ theme }) => theme.colors.secondary100};
        margin-left: 0.5rem;
      }
    }

    @media (max-width: ${breakPointMobile}) {
      /* span,
      p {
        font-size: 1.2rem;
      } */
      h1 {
        font-size: 2.5rem;
        line-height: 2.5rem;
      }
    }
  }
`;
