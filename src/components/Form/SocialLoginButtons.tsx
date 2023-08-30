'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Box, Link as MuiLink, Button } from '@mui/material';
import { useState } from 'react';
// import { GoogleLoginButton } from 'react-social-login-buttons';

// Styled Material UI Link Component
const styles = {
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6f7',
    borderRadius: 1,
    padding: '0.6rem 0',
    columnGap: '1rem',
    textDecoration: 'none',
    color: '#393e45',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: ' #fff',
      boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)',
    },
  },
};

const SocialLoginButtons = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';
  const [loading, setLoading] = useState(false);

  return (
    <Box display='flex' flexDirection='column' sx={{ paddingLeft: { sm: '3rem' }, rowGap: '1rem' }}>
      <Button
        onClick={() => {
          signIn('google', { callbackUrl });
          setLoading(true);
        }}
        sx={styles.button}
        // disabled={loading}
      >
        <Image
          src='/google.svg'
          alt='Google Logo'
          className='dark:invert'
          width={32}
          height={32}
          style={{ height: '2rem' }}
          priority
        />
        Sign in with Google
      </Button>
      <Button
        onClick={() => {
          signIn('github', { callbackUrl });
          setLoading(true);
        }}
        sx={styles.button}
        // disabled={loading}
      >
        <Image
          src='/github.svg'
          alt='GitHub Logo'
          className='dark:invert'
          width={32}
          height={32}
          style={{ height: '2rem' }}
          priority
        />
        Sign in with GitHub
      </Button>
    </Box>
  );
};

export default SocialLoginButtons;
