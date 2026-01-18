'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { type SignInValues, signInSchema } from '@/lib/validation';

export default function SignInPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const emailId = useId();
  const passwordId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SignInValues) => {
    setServerError(null);
    const res = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (res.error) {
      setServerError(res.error.message || 'Invalid email or password.');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 space-y-6 text-neutral-900 bg-white min-h-screen">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <p className="text-sm text-neutral-500">
          Welcome back! Please enter your details.
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

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor={passwordId}
              className="text-neutral-600 font-medium"
            >
              Password
            </Label>
            <a
              href="/forgot-password"
              className="text-xs text-neutral-500 hover:text-black transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Input
              {...register('password')}
              id={passwordId}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              className={cn(
                'pr-10 border-neutral-300 text-neutral-900',
                errors.password && 'border-red-500',
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-neutral-400 hover:text-black transition-colors cursor-pointer"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOffIcon size={18} strokeWidth={2} />
              ) : (
                <EyeIcon size={18} strokeWidth={2} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white font-medium rounded-md px-4 py-2.5 hover:bg-neutral-800 disabled:opacity-50 transition-colors cursor-pointer mt-2"
        >
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <footer className="text-center text-sm text-neutral-500">
        Don&apos;t have an account?{' '}
        <a href="/sign-up" className="text-black font-medium hover:underline">
          Sign up
        </a>
      </footer>
    </main>
  );
}
