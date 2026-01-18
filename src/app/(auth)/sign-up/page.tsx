import { validateSession } from '@/lib/get-session';
import SignUpClient from './sign-up-client';

export default async function SignUpPage() {
  await validateSession(false);

  return <SignUpClient />;
}
