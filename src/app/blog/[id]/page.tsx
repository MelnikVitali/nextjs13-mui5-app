import { getPostById } from '@/services/getPosts';
import { Metadata } from 'next';
import { FC } from 'react';

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

  console.log(post);

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  );
};

export default BlogPost;
