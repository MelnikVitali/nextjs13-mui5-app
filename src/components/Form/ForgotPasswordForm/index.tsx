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
import toast from 'react-hot-toast';
import { usePathname, useRouter } from 'next/navigation';
interface IFormInputs {
  email: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Please enter your email.'),
});

const ForgotPaSwordForm: FC = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver<IFormInputs>(schema),
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    const { email } = data;

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const json = await response.json();

      if (response.ok) {
        setLoading(false);
        setUserEmail(email);
        setSuccess(true);
        toast.success(json?.message);
      } else {
        toast.error(json?.message);
        setLoading(false);
        setError(json?.message);
      }
    } catch (error) {
      const message = `Error during Forgot Password: ${error}`;

      setLoading(false);
      setError(message);
      console.log(message);
    }
  };

  return (
    <Container maxWidth={false} sx={styles.container}>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%', height: '100%', margin: 'auto' }}
      >
        <Grid item sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}>
          <Grid container sx={styles.containerForms}>
            <Grid item container justifyContent='space-between' rowSpacing={5}>
              <Grid item xs={12} sm={12}>
                <Box
                  display='flex'
                  flexDirection='column'
                  justifyContent='center'
                  alignItems='center'
                  component='form'
                  noValidate
                  autoComplete='off'
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

                      <Controller
                        name='email'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Email'
                            variant='outlined'
                            focused
                            required
                            error={!!errors.email}
                            helperText={errors.email ? errors.email?.message : ''}
                            fullWidth
                            margin='dense'
                            sx={styles.formInput}
                          />
                        )}
                      />
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
