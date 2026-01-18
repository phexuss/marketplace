'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PasswordInput from '@/components/ui/password-input';
import { signUp } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { type SignUpValues, signUpSchema } from '@/lib/validation';

export default function SignUpPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const nameBaseId = useId();
  const emailBaseId = useId();
  const passwordBaseId = useId();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const passwordValue = watch('password', '');

  const onSubmit = async (data: SignUpValues) => {
    setServerError(null);
    const res = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (res.error) {
      setServerError(res.error.message || 'Something went wrong.');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 space-y-6 text-neutral-900 bg-white min-h-screen">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Sign Up</h1>
        <p className="text-sm text-neutral-500">
          Create an account to get started.
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

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={nameBaseId} className="text-neutral-600 font-medium">
            Full Name
          </Label>
          <Input
            {...register('name')}
            id={nameBaseId}
            placeholder="John Doe"
            aria-invalid={!!errors.name}
            className={cn(errors.name && 'border-red-500')}
          />
          {errors.name && (
            <p className="text-red-500 text-xs font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={emailBaseId} className="text-neutral-600 font-medium">
            Email Address
          </Label>
          <Input
            {...register('email')}
            id={emailBaseId}
            type="email"
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

        <PasswordInput
          label="Password"
          id={passwordBaseId}
          error={errors.password?.message}
          value={passwordValue}
          placeholder="••••••••"
          {...register('password')}
        />

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white font-medium rounded-md px-4 py-2.5 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </div>
      </form>

      <footer className="text-center">
        <p className="text-sm text-neutral-500">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="text-black font-semibold hover:underline underline-offset-4 transition-all"
          >
            Sign in
          </Link>
        </p>
      </footer>
    </main>
  );
}
