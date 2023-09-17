/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Box, Link as MuiLink, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { styles } from './styles';
import githubImage from '../../../../public/github.svg';
import googleImage from '../../../../public/google.svg';

const SocialLoginButtons = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, []);

  return (
    <Box display='flex' flexDirection='column' sx={{ paddingLeft: { sm: '3rem' }, rowGap: '1rem' }}>
      <Button
        onClick={() => {
          signIn('google', { callbackUrl });
          setLoading(true);
        }}
        sx={styles.button}
      >
        <Image
          src={googleImage}
          alt='Google Logo'
          width={32}
          height={32}
          style={{ height: '2rem' }}
          priority={true}
        />
        Sign in with Google
      </Button>
      <Button
        onClick={() => {
          signIn('github', { callbackUrl });
          setLoading(true);
        }}
        sx={styles.button}
      >
        <Image
          src={githubImage}
          alt='GitHub Logo'
          className='dark:invert'
          width={32}
          height={32}
          style={{ height: '2rem' }}
          priority={true}
        />
        Sign in with GitHub
      </Button>
    </Box>
  );
};

export default SocialLoginButtons;
