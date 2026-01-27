import { getUserByEmail } from '@/api/auth/signin/queries';
import NextAuth, { AuthOptions, DefaultSession, DefaultUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

interface ExtendsUser extends DefaultUser {}

declare module 'next-auth' {
  interface User extends ExtendsUser {}
  interface Session extends DefaultSession {
    user?: ExtendsUser;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: ExtendsUser;
  }
}

const auth_options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        const user = await getUserByEmail(email);
        if (!user) {
          console.error('존재하지 않는 이메일입니다.');
          return null;
        }

        const is_match = await argon2.verify(user.password_hash, password);
        if (!is_match) {
          console.error('비밀번호가 다릅니다.');
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async (params) => {
      const { account, user, token } = params;

      if (account && user) {
        // 초기 로그인
        return { ...token, user };
      }

      return { ...token };
    },
    session: async (params) => {
      const { session, token } = params;

      session.user = token.user;
      return session;
    },
  },
  jwt: {
    encode: (params) => {
      const token = jwt.sign(params.token ?? {}, params.secret);
      return token;
    },
    decode: (parmas) => {
      const decoded = jwt.verify(parmas.token ?? '', parmas.secret) as JWT;
      return decoded;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export const signinHandler = NextAuth(auth_options);
