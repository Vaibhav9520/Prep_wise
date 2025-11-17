import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  const { pathname } = request.nextUrl;
  
  // Public routes that don't require authentication
  const publicPaths = ['/sign-in', '/sign-up', '/landing', '/api'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  // Protected routes that require authentication
  const protectedPaths = ['/interview', '/profile', '/system-status', '/'];
  const isProtectedPath = protectedPaths.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  );
  
  // Redirect to sign-in if accessing protected route without session
  if (isProtectedPath && !session) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(signInUrl);
  }
  
  // Redirect to home if accessing auth pages with session
  if ((pathname === '/sign-in' || pathname === '/sign-up') && session) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};