import styled from 'styled-components';

export const Container = styled.main`
  > div {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 2rem;
    a {
      display: block;
      cursor: pointer;

      &:hover strong {
        color: ${({ theme }) => theme.colors.secondary100};
      }

      &:hover p {
        color: ${({ theme }) => theme.colors.primary100};
      }

      & + a {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid ${({ theme }) => theme.colors.primary400};
      }

      time {
        font-size: 1rem;
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme.colors.primary300};
      }

      strong {
        display: block;
        font-size: 1.5rem;
        margin-top: 1rem;
        line-height: 2rem;
        transition: color 0.3s;
      }

      p {
        color: ${({ theme }) => theme.colors.primary300};
        margin-top: 0.5rem;
        line-height: 1.625rem;
        transition: color 0.3s;
      }
    }
  }
`;
