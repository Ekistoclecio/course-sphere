import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import { ApiServiceInstance } from '@/services/client';

export interface LoginTokenDecoded {
  id: number;
  email: string;
  name: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        const { data: loginToken } = await ApiServiceInstance.post<string>('/auth', {
          email: credentials?.email,
          password: credentials?.password,
        });

        if (loginToken) {
          const decodedLoginToken = jwtDecode<LoginTokenDecoded>(loginToken);
          const user: User = {
            id: decodedLoginToken.id,
            email: decodedLoginToken.email,
            name: decodedLoginToken.name,
          };

          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
