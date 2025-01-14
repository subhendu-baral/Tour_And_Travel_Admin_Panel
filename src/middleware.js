import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request) {
  const Cookies = cookies();

  // Retrieve the 'auth' and 'id' cookies
  const isLoggedin = Cookies.get('auth');
  const userid = Cookies.get('id');

  const authRouts = ['/login',  '/signup', '/forgot-password', '/reset-password'];

  // If the user is logged in and tries to access the homepage, redirect to /user/dashboard
  if (isLoggedin && userid && authRouts.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // If the user is trying to access /user/* and is not logged in, redirect to the homepage
  if (request.nextUrl.pathname.startsWith('/admin') && !(isLoggedin && userid)) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to homepage
  }

  // If the user is logged in or accessing other routes, allow access
  return NextResponse.next();
}

// Specify which routes the middleware applies to
export const config = {
  matcher: ['/admin/:path*', '/login' , '/signup', '/forgot-password', '/reset-password'],
};


