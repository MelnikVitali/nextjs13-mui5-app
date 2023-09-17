'use client';
import { FC } from 'react';
import { Container, Grid, Box, Typography, Stack, Link as MuiLink, Alert } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { styles } from './styles';

import { signUnYupSchema } from '@/utils/yupSchemas';
import TextInput from '../FormInputs/TextInput';
import PasswordInput from '../FormInputs/PasswordInput';
import { useSignUpSubmit } from '@/hooks/useSignUpSubmit';
export interface IFormInputsSignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isTrustDevice?: boolean;
}

const SignUnForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputsSignUp>({
    resolver: yupResolver<IFormInputsSignUp>(signUnYupSchema),
  });

  const [loading, error, onSubmit] = useSignUpSubmit();

  return (
    <Container maxWidth={false} sx={styles.wrapper}>
      <Grid container sx={styles.subWrapper}>
        <Grid item sx={{ maxWidth: '70rem', width: '100%' }}>
          <Grid container sx={styles.papier}>
            <Typography variant='h4' component='h1' sx={styles.title}>
              Welcome To Blog Next.js 13!
            </Typography>
            <Grid item container rowSpacing={5} sx={styles.containerForm}>
              <Grid item xs={12} sm={12}>
                <Box
                  component='form'
                  noValidate
                  autoComplete='off'
                  sx={styles.formBox}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Typography variant='h6' component='h1' sx={{ textAlign: 'center', mb: '1rem' }}>
                    Create new your account
                  </Typography>
                  <TextInput name='name' control={control} errors={errors} label='Full Name' />
                  <TextInput name='email' control={control} errors={errors} label='Email' />
                  <PasswordInput
                    name='password'
                    control={control}
                    errors={errors}
                    label='Password'
                  />
                  <PasswordInput
                    name='confirmPassword'
                    control={control}
                    errors={errors}
                    label='Confirm Password'
                  />

                  <LoadingButton
                    loading={loading}
                    type='submit'
                    variant='contained'
                    sx={styles.loadingButton}
                  >
                    Sign Up
                  </LoadingButton>
                  {error && (
                    <Alert variant='outlined' severity='error' sx={styles.errorText}>
                      {error}
                    </Alert>
                  )}
                </Box>
              </Grid>
            </Grid>
            <Grid container justifyContent='center'>
              <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                  Already have an account?{' '}
                  <MuiLink component={Link} prefetch={false} href='/signin' sx={styles.linkSignIn}>
                    Login
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

export default SignUnForm;
