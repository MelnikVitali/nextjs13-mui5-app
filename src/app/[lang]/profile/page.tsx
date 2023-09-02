import { getServerSession } from 'next-auth/next';
import UserProfile from '@/components/UserProfile';
import { authOptions } from '@/configs/authOptions';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <UserProfile />
    </>
  );
}
