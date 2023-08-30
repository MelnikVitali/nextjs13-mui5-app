import SignUnForm from '@/components/Form/SignUpForm/';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { FC } from 'react';

const Signup: FC = async () => {
  const session = await getServerSession(authOptions);

  if (session) redirect('/');

  return <SignUnForm />;
};

export default Signup;
