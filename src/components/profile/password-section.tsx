'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, Lock } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { authClient } from '@/lib/auth-client';
import {
  type ChangePasswordValues,
  changePasswordSchema,
} from '@/lib/validation';

export default function PasswordSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState('');
  const [status, setStatus] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const newPasswordValue = form.watch('newPassword');

  const onSubmit = async ({
    currentPassword,
    newPassword,
  }: ChangePasswordValues) => {
    setStatus('');
    setServerError('');

    const { error } = await authClient.changePassword({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    });

    if (error) {
      setServerError(error.message || 'Failed to change password');
    } else {
      setStatus('Password changed');
      setIsEditing(false);
      form.reset();
    }
  };

  return (
    <div className="space-y-1.5">
      <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
        Password
      </p>
      {isEditing ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-2 relative">
            <Input
              {...form.register('currentPassword')}
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Current password"
              className="pr-10 h-9 text-sm"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-0 -top-1 h-full text-neutral-400 hover:bg-transparent hover:text-black cursor-pointer"
            >
              {showCurrentPassword ? (
                <EyeOffIcon size={18} />
              ) : (
                <EyeIcon size={18} />
              )}
            </Button>

            {form.formState.errors.currentPassword && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.currentPassword.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <PasswordInput
              {...form.register('newPassword')}
              value={newPasswordValue}
              placeholder="New password"
              className="h-9 text-sm"
            />
          </div>

          {serverError && <p className="text-red-500 text-xs">{serverError}</p>}
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-9 px-3 text-xs font-medium cursor-pointer"
            >
              {form.formState.isSubmitting ? 'Changing...' : 'Change Password'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                form.reset();
              }}
              className="h-9 px-3 text-xs font-medium cursor-pointer"
            >
              Cancel
            </Button>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <Lock size={16} className="text-neutral-400" />
            <p className="text-sm text-neutral-500 italic ">
              This will log you out of all other devices.{' '}
            </p>
          </div>
        </form>
      ) : (
        <div className="flex items-center justify-between min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <p className="text-sm font-medium tracking-[0.3em] text-neutral-300 select-none">
              ••••••••
            </p>
            {status && (
              <span className="text-green-600 text-xs font-medium">
                ✓ {status}
              </span>
            )}
          </div>
          <Button
            onClick={() => {
              setIsEditing(true);
              setStatus('');
            }}
            variant="outline"
            className="h-7 px-3 text-[11px] font-bold border-neutral-200 hover:bg-neutral-50 shrink-0 rounded-md"
          >
            Change
          </Button>
        </div>
      )}
    </div>
  );
}
