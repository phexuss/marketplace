'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PasswordInput from '@/components/ui/password-input';
import { authClient } from '@/lib/auth-client';
import { type SignUpValues, signUpSchema } from '@/lib/validation';

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{ password: SignUpValues['password'] }>({
    resolver: zodResolver(signUpSchema.pick({ password: true })),
    mode: 'onChange',
  });

  const passwordValue = watch('password', '');

  const onSubmit = async (data: { password: string }) => {
    setServerError(null);
    const { error } = await authClient.resetPassword({
      newPassword: data.password,
      token: token,
    });

    if (error) {
      setServerError(error.message ?? 'An unknown error occurred...');
    } else {
      window.location.href = '/sign-in';
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-xl border border-neutral-100 shadow-sm">
        <header className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            New Password
          </h1>
          <p className="text-sm text-neutral-500">
            Set a strong password to protect your account.
          </p>
        </header>

        {serverError && (
          <div
            role="alert"
            className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-100 text-center animate-in fade-in zoom-in-95"
          >
            {serverError}
          </div>
        )}

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <PasswordInput
            {...register('password')}
            label="New Password"
            value={passwordValue}
            placeholder="••••••••"
            error={errors.password?.message}
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white font-medium rounded-md px-4 py-2.5 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] cursor-pointer shadow-sm"
            >
              {isSubmitting ? 'Saving...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
