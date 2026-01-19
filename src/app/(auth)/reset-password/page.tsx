import { redirect } from 'next/navigation';
import ResetPasswordForm from '@/app/(auth)/reset-password/reset-password-form';
import { validateSession } from '@/lib/get-session';

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
