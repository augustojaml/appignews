# GITHUB AUTH

- [Documentation](https://next-auth.js.org/getting-started/example)

- Install Next Auth
  ```bash
  yarn add next-auth
  ```
- Create file `src/pages/api/auth/[...nextauth].ts`

  ```ts
  import NextAuth from 'next-auth';
  import Providers from 'next-auth/providers';

  export default NextAuth({
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET_ID,
        scope: 'read:user',
      }),
    ],
    callbacks: {
      async signIn(user, account, profile) {
        console.log(user);
        return true;
      },
    },
  });
  ```

- Use provider in `src/pages/_app.tsx`

  ```ts
  <NextAuthProvider session={pageProps.session}>
    <Component {...pageProps} />
  </NextAuthProvider>
  ```

- In the frontend APP Call the methods
  ```ts
  import { signIn, signOut, useSession } from 'next-auth/client';
  ```
