import type { Metadata } from 'next';
import { validateSession } from '@/lib/get-session';
import SignUpClient from './sign-up-client';

export const metadata: Metadata = {
  title: 'Sign Up',
  description:
    'Create a Shop.co account to start shopping premium clothing and accessories. Join our community today.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SignUpPage() {
  await validateSession(false);

  return <SignUpClient />;
}
