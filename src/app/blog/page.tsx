import Posts from '@/components/Posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Next App',
};

const Blog = () => {
  return (
    <>
      <h1>Blog page</h1>
      <Posts />
    </>
  );
};

export default Blog;
