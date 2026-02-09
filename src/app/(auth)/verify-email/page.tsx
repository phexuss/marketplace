import { MailCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ResendEmailButton from '@/app/(auth)/verify-email/resend-email-button';
import { auth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Verify Email',
  description:
    'Verify your email address to complete your Shop.co account registration.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function VerifyEmailPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.emailVerified) {
    redirect('/dashboard');
  }

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className="max-w-md mx-auto my-20 p-6 flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-20 h-20 bg-neutral-50 border border-neutral-100 rounded-2xl flex items-center justify-center shadow-sm">
        <MailCheck className="w-10 h-10 text-black" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
          Check your inbox
        </h1>
        <p className="text-neutral-500 text-sm leading-relaxed">
          We've sent a verification link to your email. Please click it to
          activate your account.
        </p>
      </div>

      <div className="pt-4 w-full space-y-3">
        <Link
          href="/dashboard"
          className="block w-full bg-black text-white font-medium rounded-md px-4 py-2.5 hover:bg-neutral-800 transition-colors"
        >
          Back to Dashboard
        </Link>
        <p className="text-xs text-neutral-400">
          Sometimes emails land in spam. If it's not there, you can request a
          new link.
        </p>
        <ResendEmailButton email={session?.user.email} />
      </div>
    </div>
  );
}
