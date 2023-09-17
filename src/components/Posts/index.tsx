'use client';
import useSWR from 'swr';
import { getPostsBySearch } from '@/services/getPosts';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from 'react';
import { Box, Container, Grid, Pagination, useMediaQuery } from '@mui/material';
import ScrollToTop from 'react-scroll-to-top';
import { IPosts } from '@/types/Posts';
import Post from '@/components/Post';

const firstIndex = 0;

const Posts = () => {
  const matches = useMediaQuery('(max-width:600px)');

  const [search, setSearch] = useState('');

  const { data, isLoading } = useSWR<IPosts>(
    search.trim() === '' ? ' ' : search,
    getPostsBySearch,
    {
      keepPreviousData: true,
    },
  );

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
              blogs.map((post: any, index: number) => {
                return <Post key={index} post={post} />;
              })}
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
