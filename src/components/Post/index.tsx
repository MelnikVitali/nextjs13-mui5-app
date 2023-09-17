import { FC } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { stringAvatar } from '@/utils/stringAvatar';
import { getPostsUsers } from '@/services/getPosts';
import { IPost } from '@/types/Posts';
import { IAuthorsPosts } from '@/types/AuthorsPosts';
import { styles } from './styles';

interface IPostProps {
  post: IPost;
}
const Post: FC<IPostProps> = ({ post }) => {
  const shortText = (text: string) => text.substr(0, 126) + '...';

  const { data: authors } = useSWR<IAuthorsPosts>('users', getPostsUsers);

  return (
    <Grid item lg={6} width={'100%'}>
      <Box sx={styles.boxPostTitle}>
        <Typography variant='h6' component='h2' mb={2} sx={{ fontWeight: 'bold' }}>
          {post.title}
        </Typography>
        <Typography variant='body2' color='text.secondary' mb={5}>
          {post.body ? shortText(post.body) : '...'}
        </Typography>
        <Box sx={styles.boxAvatar}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar
              {...stringAvatar(
                `${authors?.users.find((item: { id: number }) => item.id === post.userId)
                  ?.firstName} ${authors?.users.find(
                  (item: { id: number }) => item.id === post.userId,
                )?.lastName}`,
              )}
            />
            <Box display={'flex'} sx={{ ml: 1 }}>
              <Typography variant='subtitle2'>
                {`${authors?.users.find((item: { id: number }) => item.id === post.userId)
                  ?.firstName} ${authors?.users.find(
                  (item: { id: number }) => item.id === post.userId,
                )?.lastName}`}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
            <Link href={`/blog/${post.id}`} className='blog-link'>
              <Button
                endIcon={<ArrowForward />}
                color='primary'
                size='small'
                sx={{ lineHeight: 0 }}
              >
                Read more
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default Post;
