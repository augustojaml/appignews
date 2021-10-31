import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { Header } from '../components/Header';
import { useCustomTheme } from '../hooks/useCustomTheme';
import { GlobalStyle } from './styled';

interface IGlobalComponentProps {
  children: ReactNode;
}

export function GlobalComponent({ children }: IGlobalComponentProps) {
  const { customTheme } = useCustomTheme();
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Header />
        {children}
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}
