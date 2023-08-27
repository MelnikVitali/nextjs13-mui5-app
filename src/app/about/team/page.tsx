import { Typography, Box, Card, CardContent, Grid, Button } from '@mui/material';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import bestTeams from '@/images/bestTeams.jpg';
import Link from 'next/link';
import { blurMyTeam } from '@/data/blurMyTeam';

const Team = () => {
  const reviews = [
    {
      id: 1,
      name: 'Karl Brighton',
      statement:
        'The team perfectly fit the specialized skill set required. They focused on the most essential features helping us launch the platform eight months faster than planned. /n/n',
      image_url:
        'https://sweta-myteam-website-fm.netlify.app/static/media/avatar-kady.78fc482c.jpg',
      position: 'Software Engineer at Kadex',
    },
    {
      id: 2,
      name: 'Krishna Bells',
      statement:
        'We needed to automate our entire onboarding process. The team came in and built out the whole journey. Since going live, user retention has gone through the roof!',
      image_url:
        'https://sweta-myteam-website-fm.netlify.app/static/media/avatar-aiysha.e119a0c1.jpg',
      position: 'Product Manager at Google',
    },
    {
      id: 3,
      name: 'Ben Spiff',
      statement:
        'Amazing. Our team helped us build an app that delivered a new experience for hiring a physio. The launch was an instant success with 100k downloads in the first month.',
      image_url:
        'https://sweta-myteam-website-fm.netlify.app/static/media/avatar-arthur.098c2e26.jpg',
      position: 'Founder of Crypto',
    },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        // padding: ' 0 20px 20px',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px',
        margin: '0 !important',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          minHeight: '380px',
          alignItems: 'center',
          justifyContent: 'center',
          // margin: '30px 0px 50px 0px',
        }}
      >
        <Grid
          container
          spacing={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            maxWidth: '1300px',
            paddingTop: 0,
            width: '100vw !important',
          }}
        >
          <Grid item xs={12} md={5} sx={{ marginLeft: '0px', paddingTop: '0 !important' }}>
            <Image
              src={bestTeams}
              blurDataURL={blurMyTeam}
              placeholder='blur'
              alt='My Team'
              width={640}
              height={300}
              style={{ width: '100%', paddingTop: 0 }}
            />
          </Grid>

          <Grid item xs={12} md={6} sx={{ paddingTop: '0 !important' }}>
            <Typography
              variant='h3'
              fontWeight={700}
              sx={{
                paddingBottom: '15px',
              }}
            >
              We build, We revive
            </Typography>
            <Typography
              sx={{
                opacity: '0.4',
                paddingBottom: '30px',
              }}
            >
              Your business needs to be in safe hands at all times. We ensure you never run out of
              customers and not run at loss. We are trusted by over 500+ companies to deliver
              quality marketing campaigns using Digital marketing & Offline marketing channels.
            </Typography>
            <Button
              href='/about/contacts'
              component={Link}
              variant='contained'
              color='primary'
              sx={{ width: '200px', fontSize: '16px' }}
            >
              CONTACT US
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        {reviews.map((review) => (
          <Grid item sm={12} md={4} key={review.id}>
            <Card
              sx={{
                backgroundColor: '#fff',
                padding: '10px',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CardContent>
                <Typography sx={{ paddingBottom: '25px' }}>
                  &quot;{review.statement}&quot;
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  {/* @ts-ignore */}
                  <Avatar
                    src={review.image_url as string}
                    size='large'
                    sx={{ marginRight: '10px' }}
                  />
                  <Box>
                    <Typography>{review.name}</Typography>
                    <Typography sx={{ fontSize: '14px', opacity: '0.6' }}>
                      {review.position}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Team;
