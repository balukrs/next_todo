import { NextAuthOptions } from 'next-auth';
import CredentialsProviders from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectMongoDB } from './mongodb';
import User from '@/models/user';

interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProviders({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const { email, password } = credentials as Credentials;
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) return null;

          const pwdcheck = await bcrypt.compare(password, user.password);
          if (!pwdcheck) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user != null) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user != null && token.id != null) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
};
