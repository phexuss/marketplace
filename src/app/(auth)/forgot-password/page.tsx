import type { Metadata } from 'next';
import ForgotPasswordForm from '@/app/(auth)/forgot-password/forgot-password-form';
import { validateSession } from '@/lib/get-session';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description:
    'Reset your Shop.co account password. Enter your email to receive a password reset link.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ForgotPasswordPage() {
  await validateSession(false);

  return <ForgotPasswordForm />;
}
