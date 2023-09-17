import { IFormInputsSignIn } from '@/components/Form/SignInForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export const useSignInSubmit = (): [
  loading: boolean,
  error: string,
  onSubmit: SubmitHandler<IFormInputsSignIn>,
] => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInputsSignIn> = async (
    data: IFormInputsSignIn,
    event?: React.BaseSyntheticEvent,
  ) => {
    try {
      event?.preventDefault();
      const { email, password, isTrustDevice } = data;

      setError('');
      setLoading(true);

      const res = await signIn('credentials', {
        email,
        password,
        isTrustDevice,
        redirect: false,
      });

      if (res?.error) {
        setLoading(false);
        setError('Invalid Credentials');
        throw new Error('Invalid Credentials');
      }

      router.refresh();
      router.push('/profile', { scroll: true });
    } catch (error) {
      const message = `${error}`;

      setLoading(false);
      setError(message);
      console.log(message);
    }
  };

  return [loading, error, onSubmit];
};
