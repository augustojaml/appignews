import { GetStaticProps } from 'next';
import Link from 'next/link';

import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

import { GlobalSection } from '../../global/styled';
import { Container } from './styled';
import { formatPtBrDate } from '../../supports/formatPtBrDate';
import { useSession } from 'next-auth/client';

interface IPost {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: Date;
}

interface IPosts {
  posts: IPost[];
}

export default function Posts({ posts }: IPosts) {
  const [session] = useSession();

  return (
    <>
      <GlobalSection>
        <Container>
          <div>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={session?.activeSubscription ? `/posts/${post.slug}` : `/posts/preview/${post.slug}`}
              >
                <a>
                  <time>{post.updatedAt}</time>
                  <strong>{post.title}</strong>
                  <p>{post.excerpt}</p>
                </a>
              </Link>
            ))}
          </div>
        </Container>
      </GlobalSection>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const prismicResponse = await prismic.query([Prismic.predicates.at('document.type', 'publication')], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  });

  const postsFormatted = prismicResponse.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find((content: any) => content.type === 'paragraph')?.text ?? '',
      updatedAt: formatPtBrDate(post.last_publication_date),
    };
  });

  return {
    props: {
      posts: postsFormatted,
    },
  };
};
