'use client';
import { useState, type FC } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Link as MuiLink,
  TextField,
  Alert,
  InputAdornment,
  IconButton,
  Stack,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useForm, SubmitHandler, Controller, set } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import FormInput from '@/components/FormInput';
import { LoadingButton } from '@mui/lab';
import { styles } from './styles';

interface IShowPassword {
  password: boolean;
  confirmPassword: boolean;
}

interface IFormInputs {
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required('Please enter your password.')
    .min(6, 'Password must be more than 6 characters!')
    .max(32, 'Password must be less than 32 characters!'),
  confirmPassword: yup
    .string()
    .required('Please re-type your password')
    .oneOf([yup.ref('password')], 'Passwords does not match'),
});

type IResetProps = {
  id: string;
};

const ResetPasswordForm: FC<IResetProps> = ({ id }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<IShowPassword>({
    password: false,
    confirmPassword: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver<IFormInputs>(schema),
  });

  const handleClickShowPassword = (name: keyof IShowPassword) => {
    if (name) {
      setShowPassword((prev) => {
        return {
          ...prev,
          [name]: !prev[name],
        };
      });
    }
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    const { password } = data;

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reset-password/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setLoading(false);
        event?.target.reset(); // reset after form submit

        setSuccess(true);
      } else {
        const message = 'Password update failed.';
        setLoading(false);
        setError(message);
        console.log(message);
      }
    } catch (error) {
      const message = `Error during Password update: ${error}`;
      setLoading(false);
      setError(message);
      console.log(message);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: '3.5rem',
      }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%', height: '100%', margin: 'auto' }}
      >
        <Grid item sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}>
          <Grid
            container
            sx={{
              boxShadow: { sm: '0 0 5px #ddd' },
              py: '8rem',
              px: '1rem',
            }}
          >
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
                    <Box
                      sx={{
                        maxWidth: '560px',
                        textAlign: 'center',
                      }}
                    >
                      <Typography>Your password has been updated successfully.</Typography>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: '18rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant='h6'
                        component='h1'
                        sx={{ textAlign: 'center', mb: '1.5rem' }}
                      >
                        Reset Password
                      </Typography>

                      <Controller
                        name='password'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type={showPassword.password ? 'text' : 'password'}
                            label='Password'
                            variant='outlined'
                            required
                            focused
                            error={!!errors.password}
                            helperText={errors.password ? errors.password?.message : ''}
                            fullWidth
                            margin='dense'
                            sx={styles.formInput}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => handleClickShowPassword('password')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                  >
                                    {showPassword.password ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />

                      <Controller
                        name='confirmPassword'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type={showPassword.confirmPassword ? 'text' : 'password'}
                            label='Confirm Password'
                            variant='outlined'
                            error={!!errors.confirmPassword}
                            required
                            focused
                            helperText={
                              errors.confirmPassword ? errors.confirmPassword?.message : ''
                            }
                            fullWidth
                            margin='dense'
                            sx={styles.formInput}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position='end'>
                                  <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={() => handleClickShowPassword('confirmPassword')}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                  >
                                    {showPassword.confirmPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                      <LoadingButton
                        loading={loading}
                        type='submit'
                        variant='contained'
                        sx={{
                          py: '0.8rem',
                          mt: 2,
                          width: '80%',
                          marginInline: 'auto',
                        }}
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
                        sx={{
                          textDecoration: 'none',
                          fontWeight: 500,
                          color: '#3683dc',
                          '&:hover': {
                            textDecoration: 'underline',
                            color: '#5ea1b6',
                          },
                        }}
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
