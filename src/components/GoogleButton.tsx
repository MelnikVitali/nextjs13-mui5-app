'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { GoogleLoginButton } from 'react-social-login-buttons';

const GoogleButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  return (
    <GoogleLoginButton
      onClick={() => signIn('google', { callbackUrl })}
      style={{
        width: 180,
        height: 30,
        fontSize: 14,
        boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 2px',
        margin: 0,
      }}
    >
      Sign in with Google
    </GoogleLoginButton>
  );
};

export default GoogleButton;
