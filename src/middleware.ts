import { getToken, JWT as NextAuthJWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: 'next-auth.session-token',
    decode: async ({ token, secret }) => {
      if (!token || !secret) return null;

      const key = new TextEncoder().encode(String(secret));
      const { payload } = await jose.jwtVerify(token, key);

      return payload as NextAuthJWT;
    },
  });

  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  matcher: '/user/:path*',
};
