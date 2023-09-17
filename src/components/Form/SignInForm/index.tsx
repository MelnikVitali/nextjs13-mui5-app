'use client';
import { type FC } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Alert,
} from '@mui/material';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SocialLoginButtons from '@/components/Form/SocialLoginButtons';
import { LoadingButton } from '@mui/lab';
import { styles } from './styles';
import TextInput from '../FormInputs/TextInput';
import PasswordInput from '../FormInputs/PasswordInput';
import { signInYupSchema } from '@/utils/yupSchemas';
import { useSignInSubmit } from '@/hooks/useSignInSubmit';

export interface IFormInputsSignIn {
  email: string;
  password: string;
  isTrustDevice?: boolean;
}

const SignInForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputsSignIn>({
    resolver: yupResolver<IFormInputsSignIn>(signInYupSchema),
  });

  const [loading, error, onSubmit] = useSignInSubmit();

  return (
    <Container maxWidth={false} sx={styles.wrapper}>
      <Grid container sx={styles.wrapperForm}>
        <Grid item sx={{ maxWidth: '70rem', width: '100%' }}>
          <Grid container sx={styles.formContainer}>
            <Grid item container rowSpacing={5} sx={styles.signInFormContainer}>
              <Grid item xs={12} sm={6} sx={{ borderRight: { sm: '1px solid #ddd' } }}>
                <Box
                  component='form'
                  noValidate
                  autoComplete='off'
                  sx={styles.formBox}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Typography
                    variant='h6'
                    component='h1'
                    sx={{ textAlign: 'center', mb: '1.5rem' }}
                  >
                    Log into your account
                  </Typography>
                  <TextInput name='email' control={control} errors={errors} label='Email' />
                  <PasswordInput
                    name='password'
                    control={control}
                    errors={errors}
                    label='Password'
                  />
                  <Controller
                    name='isTrustDevice'
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormControlLabel
                          control={
                            <Checkbox {...field} size='small' sx={styles.isTrustDeviceCheckbox} />
                          }
                          sx={styles.isTrustDeviceController}
                          label='Trust this device'
                        />
                        {errors.isTrustDevice && (
                          <FormHelperText error>{errors.isTrustDevice.message}</FormHelperText>
                        )}
                      </>
                    )}
                  />

                  <LoadingButton
                    loading={loading}
                    type='submit'
                    variant='contained'
                    sx={styles.loadingButton}
                  >
                    Login
                  </LoadingButton>
                  {error && (
                    <Alert variant='outlined' severity='error' sx={{ marginTop: '1rem' }}>
                      {error}
                    </Alert>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant='h6' component='p' sx={styles.withAnotherProvider}>
                  Log in with another provider:
                </Typography>
                <SocialLoginButtons />
              </Grid>
            </Grid>

            <Grid container justifyContent='center'>
              <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                  Need an account?{' '}
                  <MuiLink component={Link} prefetch={false} href='/signup' sx={styles.signupLink}>
                    Sign up here
                  </MuiLink>
                </Typography>
                <Typography sx={{ fontSize: '0.9rem' }}>
                  Forgot your{' '}
                  <MuiLink
                    component={Link}
                    prefetch={false}
                    href='/forgot-password'
                    sx={styles.forgotLink}
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
