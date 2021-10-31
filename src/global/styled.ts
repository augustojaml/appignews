import { opacify, rgba } from 'polished';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.colors.primary900};
    color: ${({ theme }) => theme.colors.primary100};
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }
  /*MEDIA SCREEN*/
  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  h1,h2,h3,h4,h5,h6 {
    font-family: ${({ theme }) => theme.fonts.title};
  }

  body,
  input,
  textarea,
  select,
  button {
    font: 400 1rem ${({ theme }) => theme.fonts.text} , sans-serif;
  }

  button {
    cursor: pointer;
    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.8);
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }  
`;

export const GlobalSection = styled.section`
  width: 100vw;
  height: 100vh;
  padding: 8rem 0;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => rgba(theme.colors.secondary100, 0.1)};
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.secondary100};
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.secondary200};
  }
`;
