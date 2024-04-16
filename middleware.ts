import { NextResponse, type NextRequest } from 'next/server';
import { decodeToken } from '@/utils/sessionToken';
import { cookies } from 'next/headers';
import { ROLE_CASHIER, ROLE_CUSTOMER } from '@/constants/roles';
import { CASHIER_PATH } from '@/constants/url';

const privatePaths = '/admin';
const authPaths = ['/login', '/register'];

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

      if (roles.length == 1 && roles.includes(ROLE_CASHIER) && !isCashierPath(pathname)) {
        return NextResponse.redirect(new URL('/admin/dashboard', req.url));
      }
    }
  }

  if (isPrivatePath(pathname) && !accessToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isAuthPath(pathname) && accessToken) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  }

  return NextResponse.next();
}

function isPrivatePath(pathname: string) {
  return pathname.includes(privatePaths);
}

function isAuthPath(pathname: string) {
  return authPaths.some((path) => pathname.startsWith(path));
}

function isCashierPath(pathname: string) {
  return CASHIER_PATH.includes(pathname);
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/register'],
};
