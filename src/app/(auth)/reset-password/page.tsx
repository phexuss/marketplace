import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ResetPasswordForm from '@/app/(auth)/reset-password/reset-password-form';
import { validateSession } from '@/lib/get-session';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Set a new password for your Shop.co account.',
  robots: {
    index: false,
    follow: false,
  },
};

interface ResetPassProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPassProps) {
  await validateSession(false);
  const { token } = await searchParams;

  if (!token) {
    redirect('/sign-in');
  }

  return <ResetPasswordForm token={token} />;
}
