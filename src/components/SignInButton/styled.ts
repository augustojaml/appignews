import styled from 'styled-components';

export const Container = styled.button`
  height: 3rem;
  border-radius: 3rem;
  border: 0;
  background: ${({ theme }) => theme.colors.primary600};
  color: ${({ theme }) => theme.colors.primary100};
  font-weight: bold;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 20px;
    height: 20px;
  }

  svg.github {
    margin-right: 1rem;
  }

  svg.close {
    margin-left: 1rem;
  }
`;
