import { Metadata } from 'next';
import React from 'react';
import myteam from '@/images/myteam.jpg';
import { Grid, Typography, Button, Box } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { blurMyTeam } from '@/data/blurMyTeam';

export const metadata: Metadata = {
  title: 'About | Next App',
};

const About = () => {
  return (
    <>
      <h3 style={{ color: 'rgb(25, 118, 210)' }}>Select subitem</h3>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          minHeight: '460px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid
          container
          spacing={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: '1300px',
            padding: '50px',
          }}
        >
          <Grid item xs={12} md={6} sx={{ paddingTop: '0 !important', paddingRight: '0.8rem' }}>
            <Typography
              variant='h3'
              fontWeight={700}
              sx={{
                paddingBottom: '15px',
              }}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Let's scale your business
            </Typography>
            <Typography
              sx={{
                opacity: '0.4',
                paddingBottom: '30px',
              }}
            >
              Hire professionals who will help your business make 10X your previous income. With
              over 5years experience in Marketing & Business strategy, we are your best client.
            </Typography>
            <Button
              href='/about/contacts'
              component={Link}
              variant='contained'
              color='primary'
              sx={{ width: '200px', fontSize: '16px', mb: '3rem' }}
            >
              HIRE US
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ paddingTop: '0 !important' }}>
            <Image
              src={myteam}
              blurDataURL={blurMyTeam}
              placeholder='blur'
              alt='My Team'
              width={640}
              height={300}
              style={{ width: '100%', height: 'auto', objectFit: 'contain', paddingTop: 0 }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default About;
