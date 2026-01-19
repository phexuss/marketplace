import { notFound } from 'next/navigation';
import { type NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // Путь к твоему файлу auth.ts
export default async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const path = request.nextUrl.pathname;

  const protectedRoutes = ['/dashboard', '/admin', '/profile'];
  const authRoutes = ['/sign-in', '/sign-up', '/forgot-password'];

  const isProtectedRoute = protectedRoutes.some((p) => path.startsWith(p));
  const isAuthRoute = authRoutes.some((p) => path.startsWith(p));

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (path.startsWith('/admin') && session?.user.role !== 'admin') {
    return notFound();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
