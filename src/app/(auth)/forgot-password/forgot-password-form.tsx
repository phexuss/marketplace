'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';

const forgotPasswordSchema = z.object({
  email: z.email('Please enter a valid email address.'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const emailId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setServerError(null);
    setIsSuccess(false);

    const { error } = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo: '/reset-password',
    });

    if (error) {
      setServerError(
        error.message || 'Something went wrong. Please try again.',
      );
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6 text-neutral-900 bg-white">
      <header className="space-y-2">
        <Link
          href="/sign-in"
          className="inline-flex items-center text-sm text-neutral-500 hover:text-black transition-colors mb-2"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Sign In
        </Link>
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        <p className="text-sm text-neutral-500">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </header>

      {serverError && (
        <div
          role="alert"
          className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-100"
        >
          {serverError}
        </div>
      )}

      {isSuccess ? (
        <div className="p-4 rounded-md bg-green-50 text-green-700 text-sm border border-green-100">
          <p className="font-semibold">Check your email</p>
          <p className="mt-1">
            We&apos;ve sent a password reset link to your email address.
          </p>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor={emailId} className="text-neutral-600 font-medium">
              Email Address
            </Label>
            <Input
              {...register('email')}
              id={emailId}
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              aria-invalid={!!errors.email}
              className={cn(errors.email && 'border-red-500')}
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white font-medium rounded-md px-4 py-2.5 hover:bg-neutral-800 disabled:opacity-50 transition-colors cursor-pointer mt-2"
          >
            {isSubmitting ? 'Sending link...' : 'Send Reset Link'}
          </button>
        </form>
      )}
    </div>
  );
}
