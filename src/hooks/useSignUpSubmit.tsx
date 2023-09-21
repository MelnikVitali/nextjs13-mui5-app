import toast from 'react-hot-toast';
import { IFormInputsSignUp } from '@/components/Form/SignUpForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export const useSignUpSubmit = (): [
  loading: boolean,
  error: string,
  onSubmit: SubmitHandler<IFormInputsSignUp>,
] => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInputsSignUp> = async (
    data: IFormInputsSignUp,
    event?: React.BaseSyntheticEvent,
  ) => {
    setError('');
    setLoading(true);

    const { name, email, password, isTrustDevice } = data;

    try {
      const resUserExists = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-exists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const { user } = await resUserExists.json();
      if (user) {
        setLoading(false);
        setError('The user with this email address is already registered.');
        return;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/signup`, {
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
        router.push('/signin', { scroll: true });
      } else {
        const message = 'User registration failed.';
        setLoading(false);
        setError(message);
        console.log(message);
      }
    } catch (error) {
      const message = `${error}`;
      setLoading(false);
      setError(message);
      console.log(message);
    }
  };

  return [loading, error, onSubmit];
};
