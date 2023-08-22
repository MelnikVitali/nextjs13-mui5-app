import { getPostById } from '@/services/getPosts';
import { Metadata } from 'next';
import { FC } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({ params: { id } }: Props): Promise<Metadata> => {
  const post = await getPostById(id);

  return {
    title: post.title,
  };
};

const BlogPost: FC<Props> = async ({ params: { id } }) => {
  const post = await getPostById(id);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div className={styles.backToBlog}>
        <Link href='/blog' className={styles.backToBlogLink}>
          ← Back to Blog
        </Link>
      </div>
    </>
  );
};

export default BlogPost;
