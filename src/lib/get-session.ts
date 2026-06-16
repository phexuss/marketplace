import { headers } from 'next/headers';
import { notFound, redirect, unauthorized } from 'next/navigation';
import { auth } from '@/lib/auth';

export async function getServerSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export function buildSignInRedirect(redirectPath = '/dashboard') {
  const safeRedirectPath =
    redirectPath.startsWith('/') && !redirectPath.startsWith('//')
      ? redirectPath
      : '/dashboard';

  return `/sign-in?redirect=${encodeURIComponent(safeRedirectPath)}`;
}

export async function validateSession(
  shouldBeAuthenticated: boolean,
  requiredRole?: string,
) {
  const session = await getServerSession();

  if (requiredRole) {
    if (!session || session.user.role !== requiredRole) {
      notFound();
    }
    return session;
  }

  if (shouldBeAuthenticated) {
    if (!session) {
      unauthorized();
    }
    return session;
  }

  if (session) {
    redirect('/dashboard');
  }

  return session;
}
