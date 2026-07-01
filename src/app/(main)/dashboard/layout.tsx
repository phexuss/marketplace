import { redirect } from 'next/navigation';
import { validateSession } from '@/lib/get-session';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateSession(true);

  if (!session) {
    redirect('/sign-in');
  }

  return <>{children}</>;
}
