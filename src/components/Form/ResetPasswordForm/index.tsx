'use client';
import { FC } from 'react';
import { Container, Grid, Box, Typography, Link as MuiLink, Alert, Stack } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { styles } from './styles';
import PasswordInput from '../FormInputs/PasswordInput';
import { resetPasswordSchema } from '@/utils/yupSchemas';
import { useResetPasswordSubmit } from '@/hooks/useResetPasswordSubmit';

export interface IFormInputsResetPassword {
  password: string;
  confirmPassword: string;
}

type IResetProps = {
  id: string;
};

const ResetPasswordForm: FC<IResetProps> = ({ id }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputsResetPassword>({
    resolver: yupResolver<IFormInputsResetPassword>(resetPasswordSchema),
  });

  const [loading, error, success, onSubmit] = useResetPasswordSubmit(id);

  return (
    <Container maxWidth={false} sx={styles.wrapper}>
      <Grid container sx={styles.subWrapper}>
        <Grid item sx={{ maxWidth: '70rem', width: '100%' }}>
          <Grid container sx={styles.papier}>
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
                    <Box sx={styles.success}>
                      <Typography>Your password has been updated successfully.</Typography>
                    </Box>
                  ) : (
                    <Box sx={styles.gridForm}>
                      <Typography
                        variant='h6'
                        component='h1'
                        sx={{ textAlign: 'center', mb: '1.5rem' }}
                      >
                        Reset Password
                      </Typography>
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
                      <MuiLink
                        component={Link}
                        prefetch={false}
                        href='/signin'
                        sx={styles.signInLink}
                      >
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

export default ResetPasswordForm;
