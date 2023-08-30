'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState, type FC } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SocialLoginButtons from '@/components/Form/SocialLoginButtons';
import { LoadingButton } from '@mui/lab';
import { styles } from './styles';
import { users } from '@/data/users';
import toast from 'react-hot-toast';

interface IShowPassword {
  password: boolean;
  confirmPassword: boolean;
}

interface IFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isTrustDevice?: boolean;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter your Full Name')
    .min(4, 'Full Name must be more than 4 characters!')
    .max(70),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Please enter your email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(6, 'Password must be more than 6 characters!')
    .max(32, 'Password must be less than 32 characters!'),
  confirmPassword: yup
    .string()
    .required('Please re-type your password')
    // use oneOf to match one of the values inside the array.
    // use "ref" to get the value of password.
    .oneOf([yup.ref('password')], 'Passwords does not match'),
  isTrustDevice: yup.boolean().default(false),
});

const SignUnForm: FC = () => {
  const router = useRouter();

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
    setError('');
    setLoading(true);

    const { name, email, password, isTrustDevice } = data;

    try {
      const resUserExists = await fetch('api/user-exists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();
      if (user) {
        setLoading(false);
        setError('User already exists.');
        return;
      }
      const response = await fetch('api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          isTrustDevice,
        }),
      });

      if (response.ok) {
        setLoading(false);
        event?.target.reset(); // reset after form submit

        toast.success('User successfully registered.');
        router.refresh();
        router.push('/profile', { scroll: true });
      } else {
        const message = 'User registration failed.';
        setLoading(false);
        setError(message);
        console.log(message);
      }
    } catch (error) {
      const message = `Error during registration: ${error}`;
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
              pt: '4rem',
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
              <Typography
                variant='h4'
                component='h1'
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  mb: '',
                  pb: { sm: '3rem' },
                }}
              >
                Welcome To Blog Next.js 13!
              </Typography>
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
                  <Typography variant='h6' component='h1' sx={{ textAlign: 'center', mb: '1rem' }}>
                    Create new your account
                  </Typography>

                  <Controller
                    name='name'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type='text'
                        label='Full Name'
                        variant='outlined'
                        required
                        focused
                        error={!!errors.name}
                        helperText={errors.name ? errors.name?.message : ''}
                        fullWidth
                        margin='dense'
                        sx={styles.formInput}
                      />
                    )}
                  />

                  <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Email'
                        variant='outlined'
                        required
                        focused
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
                        helperText={errors.confirmPassword ? errors.confirmPassword?.message : ''}
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
                                {showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
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
                    Sign Up
                  </LoadingButton>
                  {error && (
                    <Alert variant='outlined' severity='error' sx={{ marginTop: '1rem' }}>
                      {error}
                    </Alert>
                  )}
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
                  Sign up using another provider:
                </Typography>
                <SocialLoginButtons />
              </Grid>
            </Grid>
            <Grid container justifyContent='center'>
              <Stack sx={{ mt: '3rem', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
                  Already have an account?{' '}
                  <MuiLink
                    component={Link}
                    prefetch={false}
                    href='/signin'
                    sx={{
                      textDecoration: 'none',
                      color: '#3683dc',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: '#5ea1b6',
                      },
                    }}
                  >
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
function signUp(
  arg0: string,
  arg1: { email: string; password: string; isTrustDevice: boolean | undefined; redirect: boolean },
) {
  throw new Error('Function not implemented.');
}
