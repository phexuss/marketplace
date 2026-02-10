import type { Metadata } from 'next';
import { Suspense } from 'react';
import { validateSession } from '@/lib/get-session';
import SignInClient from './sign-in-client';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to your Shop.co account to access your orders, wishlist, and personalized recommendations.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SignInPage() {
  await validateSession(false);

  return (
    <Suspense>
      <SignInClient />
    </Suspense>
  );
}
