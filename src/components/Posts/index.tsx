'use client';
import useSWR from 'swr';
import { getPostsUsers, getPostsBySearch } from '@/services/getPosts';
import { stringAvatar } from '@/utils/stringAvatar';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Pagination,
  useMediaQuery,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import ScrollToTop from 'react-scroll-to-top';

const firstIndex = 0;

const Posts = () => {
  const shortText = (text: string) => text.substr(0, 126) + '...';
  const matches = useMediaQuery('(max-width:600px)');

  const [search, setSearch] = useState('');

  const { data, isLoading } = useSWR(search.trim() === '' ? ' ' : search, getPostsBySearch, {
    keepPreviousData: true,
  });

  const { data: authors } = useSWR('users', getPostsUsers);

  const [pageSize] = useState(4);
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState(data?.posts.slice(firstIndex, pageSize));

  useEffect(() => {
    setBlogs(data?.posts.slice(0, pageSize));
  }, [data, pageSize]);

  const handleChange = (_event: any, value: number) => {
    setPage(value);
    setBlogs(data?.posts.slice(firstIndex + pageSize * (value - 1), pageSize * value));
  };

  return (
    <>
      <div className='search-container'>
        <input
          type='search'
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder='Search Posts...'
          autoFocus
        />
      </div>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 3 }}>
        <Pagination
          variant='outlined'
          size={matches ? 'small' : 'medium'}
          color='primary'
          count={data?.posts ? Math.ceil(data?.posts?.length / pageSize) : 1}
          page={page}
          onChange={handleChange}
        />
      </Box>

      <div className={isLoading ? 'loading' : ''}>
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid container mt={'0px'} spacing={5}>
            {blogs &&
              blogs.map((post: any, index: number) => (
                <Grid item lg={6} key={index} width={'100%'}>
                  <Box
                    sx={{
                      p: 4,
                      border: 1,
                      borderColor: 'grey.200',
                      borderRadius: 1,
                      boxShadow: 1,
                    }}
                  >
                    <Typography variant='h6' component='h2' mb={2} sx={{ fontWeight: 'bold' }}>
                      {post.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary' mb={5}>
                      {post.body ? shortText(post.body) : '...'}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Avatar
                          {...stringAvatar(
                            `${authors?.users.find(
                              (item: { id: number }) => item.id === post.userId,
                            ).firstName} ${authors?.users.find(
                              (item: { id: number }) => item.id === post.userId,
                            ).lastName}`,
                          )}
                        />
                        <Box display={'flex'} sx={{ ml: 1 }}>
                          <Typography variant='subtitle2'>
                            {`${authors?.users.find(
                              (item: { id: number }) => item.id === post.userId,
                            ).firstName} ${authors?.users.find(
                              (item: { id: number }) => item.id === post.userId,
                            ).lastName}`}
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
              ))}
          </Grid>
        </Container>
        {blogs && blogs?.length === 0 && !isLoading && (
          <h3 style={{ marginLeft: '20px' }}>There are no posts!</h3>
        )}
        <ScrollToTop smooth component={<ArrowUpwardIcon color='primary' />}>
          ArrowUpwardIcon
        </ScrollToTop>
      </div>
    </>
  );
};

export default Posts;
