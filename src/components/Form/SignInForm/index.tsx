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
  FormControlLabel,
  Checkbox,
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { useForm, SubmitHandler, Controller, set } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// import FormInput from '@/components/FormInput';
import SocialLoginButtons from '@/components/Form/SocialLoginButtons';
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver<IFormInputs>(schema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<IFormInputs> = async (data, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    const { email, password, isTrustDevice } = data;

    setError('');
    setLoading(true);

    try {
      const res = await signIn('credentials', {
        email,
        password,
        isTrustDevice,
        redirect: false,
      });

      if (res?.error) {
        setLoading(false);
        setError('Invalid Credentials');
        return;
      }

      router.refresh();
      router.push('/profile', { scroll: true });
    } catch (error) {
      const message = `Error during Authorization: ${error}`;

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
        mt: '3rem',
      }}
    >
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        sx={{ width: '100%', height: '100%', margin: 'auto' }}
      >
        <Grid item sx={{ maxWidth: '70rem', width: '100%' }}>
          <Grid
            container
            sx={{
              boxShadow: { sm: '0 0 5px #ddd' },
              py: '8rem',
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

                  <Controller
                    name='password'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        label='Password'
                        variant='outlined'
                        focused
                        required
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
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge='end'
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                  <Controller
                    name='isTrustDevice'
                    control={control}
                    render={({ field }) => (
                      <>
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              size='small'
                              sx={{ pl: '10px', color: '#c8d0d4' }}
                            />
                          }
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              fontSize: '0.8rem',
                              fontWeight: 400,
                              color: 'text.primary',
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
                <Typography
                  variant='h6'
                  component='p'
                  sx={{
                    paddingLeft: { sm: '3rem' },
                    mb: '2.2rem',
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
                    href='/forgot-password'
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
