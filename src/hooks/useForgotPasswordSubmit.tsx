import { IFormInputsForgotPassword } from '@/components/Form/ForgotPasswordForm';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export const useForgotPasswordSubmit = (): [
  loading: boolean,
  error: string,
  success: boolean,
  userEmail: string,
  onSubmit: SubmitHandler<IFormInputsForgotPassword>,
] => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const onSubmit: SubmitHandler<IFormInputsForgotPassword> = async (
    data: IFormInputsForgotPassword,
    event?: React.BaseSyntheticEvent,
  ) => {
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
      const message = `${error}`;

      setLoading(false);
      setError(message);
      console.log(message);
    }
  };

  return [loading, error, success, userEmail, onSubmit];
};
