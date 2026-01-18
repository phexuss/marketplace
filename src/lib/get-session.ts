import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export async function validateSession(
  shouldBeAuthenticated: boolean,
  requiredRole?: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (requiredRole) {
    if (!session || session.user.role !== requiredRole) {
      notFound();
    }
    return session;
  }

  if (shouldBeAuthenticated) {
    if (!session) {
      redirect('/sign-in');
    }
    return session;
  }

  if (session) {
    redirect('/dashboard');
  }

  return session;
}
