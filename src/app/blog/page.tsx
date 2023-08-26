import Posts from '@/components/Posts';
import { Box, Container, Typography } from '@mui/material';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Next App',
};

const Blog = () => {
  return (
    <>
      <Container>
        <Box sx={{ mb: 1, textAlign: 'center' }}>
          <h1 style={{ marginBottom: 0 }}>Our Blog</h1>
          <Typography variant='subtitle1'>We share our best ideas in our blog</Typography>
        </Box>
        <Posts />
      </Container>
    </>
  );
};

export default Blog;
