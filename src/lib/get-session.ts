import { headers } from 'next/headers';
import { redirect, unauthorized } from 'next/navigation';
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
      unauthorized();
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
