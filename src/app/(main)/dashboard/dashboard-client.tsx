'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';

interface User {
  name: string;
  email: string;
}

export default function DashboardClient({ user }: { user: User }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in');
        },
      },
    });
  };

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-6 text-neutral-900 bg-white">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-neutral-500">
          Welcome, <span className="text-black font-semibold">{user.name}</span>
          !
        </p>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="flex items-center gap-2 px-4 py-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer font-medium"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </main>
  );
}
