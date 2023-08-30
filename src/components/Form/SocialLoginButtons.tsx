'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Box, Link as MuiLink, Button } from '@mui/material';
// import { GoogleLoginButton } from 'react-social-login-buttons';

// Styled Material UI Link Component
export const OauthMuiLink = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f6f7;
  border-radius: 1;
  padding: 0.6rem 0;
  column-gap: 1rem;
  text-decoration: none;
  color: #393e45;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    box-shadow: 0 1px 13px 0 rgb(0 0 0 / 15%);
  }
`;

const SocialLoginButtons = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  return (
    <Box display='flex' flexDirection='column' sx={{ paddingLeft: { sm: '3rem' }, rowGap: '1rem' }}>
      <OauthMuiLink onClick={() => signIn('google', { callbackUrl })}>
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
      </OauthMuiLink>
      <OauthMuiLink onClick={() => signIn('github', { callbackUrl })}>
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
      </OauthMuiLink>
    </Box>
  );
};

export default SocialLoginButtons;
