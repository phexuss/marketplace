'use client';

import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  const pathname = usePathname();
  return (
    <main className="flex items-center justify-center bg-white p-6 text-neutral-900 mt-20 mb-40">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="p-4 bg-red-50 rounded-3xl">
            <ShieldAlert className="size-12 text-red-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">401</h1>
          <h2 className="text-xl font-semibold">Unauthorized Access</h2>
          <p className="text-neutral-500 text-sm">
            Sorry, you don't have permission to access this page. Please sign in
            to your account to continue.
          </p>
        </div>

        <div className="pt-4">
          <Button
            asChild
            className="w-full h-12 bg-neutral-900 text-white text-md hover:bg-black rounded-2xl transition-all duration-200 font-semibold flex items-center justify-center gap-2 "
          >
            <Link href={`/sign-in?redirect=${pathname}`}>Sign In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
