import ForgotPasswordForm from '@/app/(auth)/forgot-password/forgot-password-form';
import { validateSession } from '@/lib/get-session';

export default async function ForgotPasswordPage() {
  await validateSession(false);

  return <ForgotPasswordForm />;
}
