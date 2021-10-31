# PRISMIC

- [DOCS](https://prismic.io/)

- Create new repository => https://prismic.io/dashboard/new-repository

  - Type repository name
  - Display name optional
  - What is you role/job title => Developer
  - What technology do you plan to use in you repository => Next.js
  - Check Free Plan and Create Repository

- Open repository created | Go to => https://jamlrocketseatignews.prismic.io/masks/ and Create New | Select Repeatable Type and type Name | Click in Create newe custom type

- Get => UUD | Title | Rich Text

- Go to => https://jamlrocketseatignews.prismic.io/documents/last And created some posts

- Go to settings => https://jamlrocketseatignews.prismic.io/settings/ | In repository security select Private API - Require an access token for any request

- Create Permanent access tokens and copy. Copy too api end point

- For access posts created

  - Install dependencies

    ```bash
    yarn add @prismicio/client prismic-dom
    ```

  - Create file `src/services/prismic.ts`

    ```ts
    import Prismic from '@prismicio/client';

    export function getPrismicClient(req?: unknown) {
      const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT, {
        req: req,
        accessToken: process.env.PRISMIC_PERMANENT_ACCESS_TOKEN,
      });

      return prismic;
    }
    ```
