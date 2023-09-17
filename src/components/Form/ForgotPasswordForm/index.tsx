'use client';
import { useState, FC } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  TextField,
  Alert,
} from '@mui/material';
import Link from 'next/link';
import { useForm, SubmitHandler, Controller, set } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { styles } from './styles';

import { usePathname, useRouter } from 'next/navigation';
import TextInput from '../FormInputs/TextInput';
import { forgotPaSwordSchema } from '@/utils/yupSchemas';
import { useForgotPasswordSubmit } from '@/hooks/useForgotPasswordSubmit';
export interface IFormInputsForgotPassword {
  email: string;
}

const ForgotPaSwordForm: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputsForgotPassword>({
    resolver: yupResolver<IFormInputsForgotPassword>(forgotPaSwordSchema),
  });

  const [loading, error, success, userEmail, onSubmit] = useForgotPasswordSubmit();

  return (
    <Container maxWidth={false} sx={styles.container}>
      <Grid container justifyContent='center' sx={styles.subContainer}>
        <Grid item sx={{ maxWidth: '70rem', width: '100%' }}>
          <Grid container sx={styles.containerForms}>
            <Grid item container justifyContent='space-between' rowSpacing={5}>
              <Grid item xs={12} sm={12}>
                <Box
                  component='form'
                  noValidate
                  autoComplete='off'
                  sx={styles.formBox}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {success ? (
                    <Box sx={styles.item}>
                      <Typography
                        variant='h6'
                        component='h1'
                        sx={{ textAlign: 'center', mb: '1.5rem' }}
                      >
                        Check your inbox
                      </Typography>
                      <Typography>
                        An email has been sent{' '}
                        <Box component='span' sx={{ color: 'rgb(25, 118, 210)', fontWeight: 500 }}>
                          {userEmail}
                        </Box>
                        . Please follow the link in that email to reset your password.
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={styles.boxPassword}>
                      <Typography
                        variant='h6'
                        component='h1'
                        sx={{ textAlign: 'center', mb: '1.5rem' }}
                      >
                        Forgot Password
                      </Typography>

                      <TextInput name='email' control={control} errors={errors} label='Email' />
                      <LoadingButton
                        loading={loading}
                        type='submit'
                        variant='contained'
                        sx={styles.btn}
                      >
                        Submit
                      </LoadingButton>
                    </Box>
                  )}
                  {error && (
                    <Alert variant='outlined' severity='error' sx={{ marginTop: '1rem' }}>
                      {error}
                    </Alert>
                  )}
                  <Grid container justifyContent='center'>
                    <Stack sx={{ mt: '1.5rem', textAlign: 'center' }}>
                      <MuiLink component={Link} prefetch={false} href='/signin' sx={styles.link}>
                        Return to Login
                      </MuiLink>
                    </Stack>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPaSwordForm;
