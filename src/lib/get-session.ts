import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export async function validateSession(shouldBeAuthenticated: boolean) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (shouldBeAuthenticated && !session) {
    redirect('/sign-in');
  }

  if (!shouldBeAuthenticated && session) {
    redirect('/dashboard');
  }

  return session;
}
