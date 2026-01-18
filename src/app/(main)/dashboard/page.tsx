import { validateSession } from '@/lib/get-session';
import DashboardClient from './dashboard-client';

export default async function DashboardPage() {
  const session = await validateSession(true);

  if (!session) return null;

  return <DashboardClient user={session.user} />;
}
