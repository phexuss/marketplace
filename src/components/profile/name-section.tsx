'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-client';
import { type UpdateNameValues, updateNameSchema } from '@/lib/validation';

interface NameSectionProps {
  name: string;
}

export default function NameSection({ name }: NameSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentName, setCurrentName] = useState(name);
  const [status, setStatus] = useState('');

  const router = useRouter();

  const form = useForm<UpdateNameValues>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: { name: currentName },
  });

  const onSubmit = async (data: UpdateNameValues) => {
    setStatus('');
    const { error } = await authClient.updateUser({ name: data.name });
    if (error) {
      form.setError('root', {
        message: error.message || 'Failed to update name',
      });
    } else {
      setCurrentName(data.name);
      setIsEditing(false);
      setStatus('Name updated');
      router.refresh();
    }
  };

  return (
    <div className="space-y-1.5">
      <p className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
        Full Name
      </p>
      {isEditing ? (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex items-center gap-2">
            <Input
              {...form.register('name')}
              className="flex-1 h-9 text-sm"
              placeholder="Enter your name"
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
                form.reset({ name: currentName });
              }}
              className="h-9 px-3 text-xs font-medium"
            >
              Cancel
            </Button>
          </div>
          {form.formState.errors.name && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.name.message}
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
            <p className="text-sm font-medium truncate">{currentName}</p>
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
