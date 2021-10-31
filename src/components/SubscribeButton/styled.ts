import styled from 'styled-components';

export const Container = styled.button`
  height: 4rem;
  width: 260px;
  border: 0;
  border-radius: 2rem;
  background: ${({ theme }) => theme.colors.secondary100};
  color: var(--gray-900);
  font-size: 1.25rem;
  font-weight: bold;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
