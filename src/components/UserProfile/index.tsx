/* eslint-disable @next/next/no-img-element */
'use client';
import { Container, UserEmail, UserName, Wrapper } from './styles';
import { useSession, signOut } from 'next-auth/react';
import { Box, Button } from '@mui/material';

const UserProfile = () => {
  const { data: session }: any = useSession();

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: '3rem' }}>
        {session && (
          <>
            <h1>
              Profile of{' '}
              <Box component='span' sx={{ color: 'rgb(25, 118, 210)' }}>
                {session?.user?.name}
              </Box>
            </h1>
            <UserEmail>{session?.user?.email}</UserEmail>

            <Button variant='contained' onClick={() => signOut()}>
              Sign out
            </Button>
          </>
        )}
      </Box>
      {session && (
        <img
          src={
            session?.user?.image
              ? session.user.image
              : 'https://static.wixstatic.com/media/ccea43_7c8d08dd8a224afe8b96496c53cf44ae~mv2.png/v1/fill/w_392,h_392,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Image-empty-state.png'
          }
          alt='user image'
        />
      )}
    </>
  );
};

export default UserProfile;
