import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { RichText } from 'prismic-dom';

import { GlobalSection } from '../../global/styled';
import { getPrismicClient } from '../../services/prismic';
import { formatPtBrDate } from '../../supports/formatPtBrDate';
import { Container } from './slugStyled';

interface IPost {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: IPost) {
  return (
    <>
      <GlobalSection>
        <Container>
          <article>
            <h1>{post.title}</h1>
            <time>{post.updatedAt}</time>
            <div className="postContent" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </Container>
      </GlobalSection>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });
  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const prismic = getPrismicClient(req);
  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    slug: slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: formatPtBrDate(response.last_publication_date),
  };

  return {
    props: {
      post: post,
    },
  };
};
