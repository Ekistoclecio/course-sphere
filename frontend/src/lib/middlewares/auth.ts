import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];

export async function authMiddleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('token', token);
  console.log('req.nextUrl.pathname', req.nextUrl.pathname);

  if (req.nextUrl.pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } else {
      console.log('redirecting to sign-in');
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  if (!token && !PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return null;
}
