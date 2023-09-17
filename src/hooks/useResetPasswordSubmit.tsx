import { IFormInputsResetPassword } from '@/components/Form/ResetPasswordForm';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

export const useResetPasswordSubmit = (
  id: string,
): [
  loading: boolean,
  error: string,
  success: boolean,
  onSubmit: SubmitHandler<IFormInputsResetPassword>,
] => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInputsResetPassword> = async (
    data: IFormInputsResetPassword,
    event?: React.BaseSyntheticEvent,
  ) => {
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

  return [loading, error, success, onSubmit];
};
