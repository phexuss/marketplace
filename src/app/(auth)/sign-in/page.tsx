import { validateSession } from '@/lib/get-session';
import SignInClient from './sign-in-client';

export default async function SignInPage() {
  await validateSession(false);

  return <SignInClient />;
}
