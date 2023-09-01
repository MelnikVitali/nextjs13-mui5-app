import ResetPasswordForm from '@/components/Form/ResetPasswordForm';
import { FC } from 'react';

type Props = {
  params: {
    id: string;
  };
};

const ResetPassword: FC<Props> = ({ params: { id } }) => {
  return <ResetPasswordForm id={id} />;
};

export default ResetPassword;
