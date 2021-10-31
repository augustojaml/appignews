import { AppProps } from 'next/dist/shared/lib/router/router';

import { Provider as NextAuthProvider } from 'next-auth/client';
import { GlobalComponent } from '../global/GlobalComponent';
import { CustomThemeProvider } from '../hooks/useCustomTheme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextAuthProvider session={pageProps.session}>
        <CustomThemeProvider>
          <GlobalComponent>
            <Component {...pageProps} />
          </GlobalComponent>
        </CustomThemeProvider>
      </NextAuthProvider>
    </>
  );
}

export default MyApp;
