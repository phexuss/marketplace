import ProfileForm from '@/components/profile/profile-form';

interface User {
  name: string;
  email: string;
  createdAt: Date;
  emailVerified?: boolean;
  role?: string | null;
}

export default function DashboardClient({ user }: { user: User }) {
  return <ProfileForm user={user} />;
}
