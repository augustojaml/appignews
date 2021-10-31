import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { RichText } from 'prismic-dom';
import { GlobalSection } from '../../../global/styled';
import { useCustomTheme } from '../../../hooks/useCustomTheme';
import { getPrismicClient } from '../../../services/prismic';
import { formatPtBrDate } from '../../../supports/formatPtBrDate';

import { Container } from './../slugStyled';
import { useEffect } from 'react';

interface IPost {
  post: {
    slug: string;
    title: string;
    content: string;
    updateAt: string;
  };
}

export default function Preview({ post }: IPost) {
  const { customTheme } = useCustomTheme();
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [post.slug, router, session]);

  return (
    <>
      <GlobalSection>
        <Container>
          <article>
            <h1>{post.title}</h1>
            <time>{post.updateAt}</time>
            <div className={`postContent previewContent`} dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="continueReading">
              Wanna continue reading?
              <Link href="/">
                <a href="">Subscribe now 🤗</a>
              </Link>
            </div>
          </article>
        </Container>
      </GlobalSection>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    slug: slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updateAt: formatPtBrDate(response.last_publication_date),
  };

  return {
    props: {
      post: post,
    },
    revalidate: 60 * 30, // 30 min
  };
};
