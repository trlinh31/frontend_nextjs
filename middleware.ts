import { NextResponse, type NextRequest } from 'next/server';
import { decodeToken } from '@/utils/sessionToken';
import { cookies } from 'next/headers';
import { ROLE_CASHIER, ROLE_CUSTOMER } from '@/constants/roles';

const privatePaths = '/admin';
const authPaths = ['/login', '/register'];
const cashierPath = ['/admin/transaction', '/admin/product'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = cookies().get('accessToken')?.value;

  if (accessToken) {
    const decodedToken = decodeToken(accessToken);
    if (decodedToken && decodedToken.roles) {
      const { roles } = decodedToken;
      if (isPrivatePath(pathname)) {
        if (roles.length == 1 && roles.includes(ROLE_CUSTOMER)) {
          return NextResponse.redirect(new URL('/client', req.url));
        } else {
          NextResponse.redirect(new URL('/admin/dashboard', req.url));
        }
      }
    }
  }

  if (isPrivatePath(pathname) && !accessToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

function isPrivatePath(pathname: string) {
  return pathname.includes(privatePaths);
}

function isAuthPath(pathname: string) {
  return authPaths.some((path) => pathname.startsWith(path));
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/register'],
};
