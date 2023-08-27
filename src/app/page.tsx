import { Box, Button, Card, Grid, Typography } from '@mui/material';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Box component='div' className='main-home'>
        <h1>
          Welcome to{' '}
          <a href='https://nextjs.org/docs' target='_blank' className='code'>
            Next.js13
          </a>
          &nbsp;and&nbsp;
          <a href='https://mui.com/material-ui/getting-started/' target='_blank' className='code'>
            MUI5
          </a>
        </h1>

        <Typography paragraph className='description'>
          Get started by editing{' '}
          <Button disabled sx={{ textTransform: 'lowercase', fontSize: '1rem', mt: '-2px' }}>
            src/app/layout.tsx
          </Button>
        </Typography>

        <Grid container spacing={1} sx={{ flexWrap: 'wrap', maxWidth: '800px', mt: 2 }}>
          <Grid container item sm={6}>
            <a href='https://nextjs.org/learn' target='_blank'>
              <Card className='card-home'>
                <Typography variant='h5' className='card-home-text'>
                  Documentation &rarr;
                </Typography>
                <Typography paragraph>
                  Find in-depth information about Next.js features and API.
                </Typography>
              </Card>
            </a>
          </Grid>

          <Grid container item sm={6}>
            <a href='https://nextjs.org/learn' target='_blank'>
              <Card className='card-home'>
                <Typography variant='h5' className='card-home-text'>
                  Learn &rarr;
                </Typography>
                <Typography paragraph>
                  Learn about Next.js in an interactive course with quizzes!
                </Typography>
              </Card>
            </a>
          </Grid>
          <Grid container item sm={6}>
            <a href='https://github.com/vercel/next.js/tree/master/examples' target='_blank'>
              <Card className='card-home'>
                <Typography variant='h5' className='card-home-text'>
                  Examples &rarr;
                </Typography>
                <Typography paragraph>
                  Discover and deploy boilerplate example Next.js projects.
                </Typography>
              </Card>
            </a>
          </Grid>
          <Grid container item sm={6}>
            <a
              href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
              target='_blank'
            >
              <Card className='card-home'>
                <Typography variant='h5' className='card-home-text'>
                  Deploy &rarr;
                </Typography>
                <Typography paragraph>
                  Instantly deploy your Next.js site to a public URL with Vercel.
                </Typography>
              </Card>
            </a>
          </Grid>
        </Grid>
      </Box>
      <footer className='vercel-footer'>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className='logo'>
            <Image
              src='/vercel.svg'
              alt='Vercel Logo'
              width={72}
              height={16}
              style={{ paddingTop: '1px' }}
            />
          </span>
        </a>
      </footer>
    </>
  );
}
