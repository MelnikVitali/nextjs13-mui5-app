import { getPostById, getPostUserById } from '@/services/getPosts';
import { Metadata } from 'next';
import Image from 'next/image';
import { FC } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { Avatar, Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { blurPost } from '@/data/blurPost';
import { stringAvatar } from '@/utils/stringAvatar';

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
  const user = await getPostUserById(post.userId);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          alt='Blog post image'
          src={`https://api.slingacademy.com/public/sample-blog-posts/${id}.png`}
          priority={true}
          width={800}
          height={600}
          blurDataURL={blurPost}
          placeholder='blur'
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            margin: '0 auto 20px',
          }}
        />
      </Box>
      <h1 style={{ marginBottom: '40px' }}>{post.title}</h1>
      <div style={{ textIndent: '35px' }}>{post.body}</div>
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', mt: 4 }}>
        <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)} />
        <Box display={'flex'}>
          <Typography
            variant='subtitle2'
            sx={{ pl: 1 }}
          >{`${user.firstName} ${user.lastName}`}</Typography>
        </Box>
      </Box>
      <div className={styles.backToBlog}>
        <Link href='/blog' className={styles.backToBlogLink}>
          <Button
            startIcon={<ArrowBackIcon />}
            color='primary'
            size='small'
            sx={{ lineHeight: 0, marginLeft: 'auto' }}
          >
            Back to Blog page
          </Button>
        </Link>
      </div>
    </Box>
  );
};

export default BlogPost;
