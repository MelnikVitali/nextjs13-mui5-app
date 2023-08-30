import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserProfile from '@/components/UserProfile';

export default async function Profile() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <UserProfile />
    </>
  );
}
