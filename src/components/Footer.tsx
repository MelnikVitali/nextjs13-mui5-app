import { Typography, Link as MuiLink, Box } from '@mui/material';
import Link from 'next/link';

const Footer = () => {
  return (
    <Box component='footer' sx={{ margin: '50px 0 0' }}>
      <Typography variant='subtitle1' align='center' color='text.secondary' component='p'>
        Powered by Nesxt.js 13, Material UI 5, SWR, Firebase Authentication, NextAuth.js, React Hook
        Form and Yup
        <br />
      </Typography>
      <Typography variant='body2' sx={{ display: 'block' }} color='text.secondary' align='center'>
        {'Copyright © '}
        <MuiLink
          component={Link}
          color='inherit'
          href='https://github.com/MelnikVitali/nextjs-blog-app'
          target='_blank'
        >
          Vitalii Melnik
        </MuiLink>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default Footer;
