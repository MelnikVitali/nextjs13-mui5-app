import NextAuth from 'next-auth';
import type { AuthOptions } from 'next-auth';
import GoggleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectToMongoDB } from '@/lib/mongodb';

export const authOptions: AuthOptions = {
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
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        try {
          await connectToMongoDB().catch((err) => {
            throw new Error(err);
          });

          const user = await User.findOne({ email: credentials?.email }).select('+password');

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(credentials!.password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          return user;
        } catch (error) {
          console.log('Error: ', error);
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    // The maximum age of the NextAuth.js issued JWT in seconds.
    // Defaults to `session.maxAge`.
    strategy: 'jwt',
    maxAge: 4 * 60 * 60, // 4 hours ??? 7 * 24 * 60 * 60; // 7 days;
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
