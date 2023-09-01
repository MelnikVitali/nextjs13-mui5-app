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
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

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
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

    // console.log('ForgotPassword Email: ', email);

    setError('');
    setLoading(true);

    try {
      const response = await fetch('api/forgot-password', {
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

export default ForgotPaSwordForm;
