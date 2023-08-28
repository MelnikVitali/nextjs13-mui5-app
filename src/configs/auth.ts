import type { AuthOptions, User } from 'next-auth';
import GoggleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { users } from '@/data/users';

export const authConfig: AuthOptions = {
  providers: [
    //https://cloud.google.com/ --> console --> APIs & services --> My Project --> Credentials --> Create OAuth client ID
    //http://localhost:3000/api/auth/callback/google
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    //https://github.com/settings/developers
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const currentUser = users.find(
          (user: { email: string }) => user.email === credentials.email,
        );

        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...userWithoutPass } = currentUser;

          return userWithoutPass as User;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
};
