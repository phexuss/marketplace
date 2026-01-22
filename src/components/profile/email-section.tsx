'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { type UpdateEmailValues, updateEmailSchema } from '@/lib/validation';

interface EmailSectionProps {
  email: string;
}

export default function EmailSection({ email }: EmailSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState('');
  const [currentEmail, setCurrentEmail] = useState(email);
  const [status, setStatus] = useState('');

  const form = useForm<UpdateEmailValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { email: currentEmail },
  });

  const onSubmit = async (data: UpdateEmailValues) => {
    setStatus('');
    setServerError('');

    const { error } = await authClient.changeEmail({ newEmail: data.email });
    if (error) {
      setServerError(error.message || 'Failed to change email...');
    } else {
      setCurrentEmail(data.email);
      setStatus('Verification link sent to your current address');
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
        Email Address
      </p>
      {isEditing ? (
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <Input
              {...form.register('email')}
              type="email"
              className="flex-1 h-9 text-sm"
              placeholder="Enter new email"
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="h-9 px-3 text-xs font-medium"
            >
              {form.formState.isSubmitting ? 'Saving...' : 'Save'}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                form.reset({ email: currentEmail });
              }}
              className="h-9 px-3 text-xs font-medium"
            >
              Cancel
            </Button>
          </div>
          <p className="mt-2 ml-1 text-red-500 text-sm">{serverError}</p>
          {form.formState.errors.email && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.email.message}
            </p>
          )}
          {form.formState.errors.root && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.root.message}
            </p>
          )}
        </form>
      ) : (
        <div className="flex items-center justify-between group min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <p className="text-sm font-medium truncate text-neutral-600">
              {currentEmail}
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
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-neutral-100 shrink-0 rounded-full"
          >
            <Pencil className="size-3.5 text-neutral-500" />
          </Button>
        </div>
      )}
    </div>
  );
}
