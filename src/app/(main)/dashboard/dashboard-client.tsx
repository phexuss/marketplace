'use client';
import {
  Calendar,
  LayoutDashboard,
  LogOut,
  Package,
  ShieldAlert,
  ShieldCheck,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';

interface User {
  name: string;
  email: string;
  createdAt: Date;
  emailVerified?: boolean;
  role?: string | null;
}

export default function DashboardClient({ user }: { user: User }) {
  const router = useRouter();
  const createdDate = new Date(user.createdAt).toDateString();

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
    <main className="max-w-7xl mx-auto p-6 space-y-8 bg-white text-neutral-900">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="text-neutral-500">
            Welcome back,{' '}
            <span className="text-black font-semibold">{user.name} </span>
            {user.role === 'admin' && (
              <span className="text-red-800 font-main ml-1">Admin</span>
            )}
          </div>
          <div>
            {user.role === 'admin' ? (
              <div>
                <Link href="/admin">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white hover:bg-black rounded-lg transition-all duration-200 cursor-pointer font-medium text-sm"
                  >
                    <LayoutDashboard size={18} />
                    Admin Panel
                  </button>
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="flex items-center w-fit gap-2 px-4 py-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 cursor-pointer font-medium"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">
              Account Status
            </p>
            {user.emailVerified ? (
              <ShieldCheck className="text-green-500" size={20} />
            ) : (
              <ShieldAlert className="text-amber-500" size={20} />
            )}
          </div>
          <div>
            {user.emailVerified ? (
              <p className="text-lg font-bold text-green-600">Verified</p>
            ) : (
              <div className="space-y-2">
                <p className="text-lg font-bold text-amber-600">Unverified</p>
                <Link href="/verify-email">
                  <button
                    type="button"
                    className="text-xs cursor-pointer bg-amber-100 text-amber-700 px-2 py-1 rounded-md hover:bg-amber-200 transition-colors"
                  >
                    Verify Now
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">Total Orders</p>
            <Package className="text-neutral-400" size={20} />
          </div>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">Wishlist</p>
            <Star className="text-neutral-400" size={20} />
          </div>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="p-6 bg-white border border-neutral-100 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-500">Member Since</p>
            <Calendar className="text-neutral-400" size={20} />
          </div>
          <p className="text-sm font-bold truncate">{createdDate}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-neutral-50 border border-neutral-100 rounded-2xl p-8 flex items-center justify-center text-center">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">No recent activity</h2>
            <p className="text-neutral-500 text-sm max-w-xs">
              When you start shopping, your orders and tracking info will appear
              here.
            </p>
          </div>
        </div>

        <div className="bg-white border border-neutral-100 rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-lg">Profile Details</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-neutral-400 uppercase font-bold tracking-wider">
                Email
              </p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-400 uppercase font-bold tracking-wider">
                Username
              </p>
              <p className="text-sm font-medium">
                @{user.name.toLowerCase().replace(/\s+/g, '')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
