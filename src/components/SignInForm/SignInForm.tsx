'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type { FC, FormEventHandler } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
  TextField,
  FormHelperText,
} from '@mui/material';
import Link from 'next/link';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import FormInput from '@/components/FormInput';
import SocialLoginButtons from '@/components/SocialLoginButtons';
import { LoadingButton } from '@mui/lab';
import { styles } from './styles';

interface IFormInputs {
  email: string;
  password: string;
  isTrustDevice?: boolean;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Please enter your email.'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(6, 'Password is too short!')
    .max(40, 'Password is too long!'),
  isTrustDevice: yup.boolean().default(false),
});

const SignInForm: FC = () => {
  const router = useRouter();

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver<IFormInputs>(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      isTrustDevice: data.isTrustDevice,
      redirect: false,
    });

    if (res && !res.error) {
      router.push('/profile');
    } else {
      console.log(res);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%', height: '100%' }}
      >
        <Grid item sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}>
          <Grid
            container
            sx={{
              boxShadow: { sm: '0 0 5px #ddd' },
              py: '6rem',
              px: '1rem',
            }}
          >
            <Grid
              item
              container
              justifyContent='space-between'
              rowSpacing={5}
              sx={{
                maxWidth: { sm: '45rem' },
                marginInline: 'auto',
              }}
            >
              <Grid item xs={12} sm={6} sx={{ borderRight: { sm: '1px solid #ddd' } }}>
                <Box
                  display='flex'
                  flexDirection='column'
                  component='form'
                  noValidate
                  autoComplete='off'
                  sx={{ paddingRight: { sm: '3rem' } }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Typography
                    variant='h6'
                    component='h1'
                    sx={{ textAlign: 'center', mb: '1.5rem' }}
                  >
                    Log into your account
                  </Typography>

                  <Controller
                    name='email'
                    control={control}
                    defaultValue='example@dev.com'
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Email'
                        variant='outlined'
                        error={!!errors.email}
                        helperText={errors.email ? errors.email?.message : ''}
                        fullWidth
                        margin='dense'
                        sx={styles.formInput}
                      />
                    )}
                  />

                  <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type='password'
                        label='Password'
                        variant='outlined'
                        error={!!errors.password}
                        helperText={errors.password ? errors.password?.message : ''}
                        fullWidth
                        margin='dense'
                        sx={styles.formInput}
                      />
                    )}
                  />

                  {/* <FormControlLabel
                    control={
                      <Checkbox
                        size='small'
                        aria-label='trust this device checkbox'
                        required
                        onChange={handleChange}
                        // onChange={(e) => onChange(e.target.checked)}
                      />
                    }
                    label={
                      <Typography
                        variant='body2'
                        sx={{
                          
                        }}
                      >
                        Trust this device
                      </Typography>
                    }
                  /> */}

                  <Controller
                    name='isTrustDevice'
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormControlLabel
                          control={<Checkbox {...field} size='small' />}
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              fontSize: '0.8rem',
                              fontWeight: 400,
                              color: '#5e5b5d',
                            },
                          }}
                          label='Trust this device'
                        />
                        {errors.isTrustDevice && (
                          <FormHelperText error>{errors.isTrustDevice.message}</FormHelperText>
                        )}
                      </>
                    )}
                  />

                  <LoadingButton
                    loading={false}
                    type='submit'
                    variant='contained'
                    sx={{
                      py: '0.8rem',
                      mt: 2,
                      width: '80%',
                      marginInline: 'auto',
                    }}
                  >
                    Login
                  </LoadingButton>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant='h6'
                  component='p'
                  sx={{
                    paddingLeft: { sm: '3rem' },
                    mb: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  Log in with another provider:
                </Typography>
                <SocialLoginButtons />
              </Grid>
            </Grid>

            <Grid container justifyContent='center'>
              <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                  Need an account?{' '}
                  <MuiLink
                    component={Link}
                    prefetch={false}
                    href='/signup'
                    sx={{
                      textDecoration: 'none',
                      color: '#3683dc',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: '#5ea1b6',
                      },
                    }}
                  >
                    Sign up here
                  </MuiLink>
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  Forgot your{' '}
                  <MuiLink
                    component={Link}
                    prefetch={false}
                    href='/forgotPassword'
                    sx={{
                      textDecoration: 'none',
                      color: '#3683dc',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: '#5ea1b6',
                      },
                    }}
                  >
                    password?
                  </MuiLink>
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInForm;
