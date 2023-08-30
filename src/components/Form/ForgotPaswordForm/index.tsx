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
  const [loading, setLoading] = useState(false);
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

    console.log('ForgotPassword Email: ', email);

    setError('');
    setLoading(true);

    try {
      // const res = await signIn('credentials', {
      //   email,
      //   password,
      //   redirect: false,
      // });
      // if (res?.error) {
      //   setLoading(false);
      //   setError('Invalid Credentials');
      //   return;
      // }
      // router.refresh();
      // router.push('/profile', { scroll: true });
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
            <Grid
              item
              container
              justifyContent='space-between'
              rowSpacing={5}
              sx={{
                maxWidth: '18rem',
                marginInline: 'auto',
              }}
            >
              <Grid item xs={12} sm={12}>
                <Box
                  display='flex'
                  flexDirection='column'
                  component='form'
                  noValidate
                  autoComplete='off'
                  onSubmit={handleSubmit(onSubmit)}
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
                  {error && (
                    <Alert variant='outlined' severity='error' sx={{ marginTop: '1rem' }}>
                      {error}
                    </Alert>
                  )}
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
