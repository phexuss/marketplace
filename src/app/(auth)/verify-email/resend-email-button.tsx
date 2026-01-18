'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';

interface ResendEmailButtonProps {
  email: string;
}

const ResendEmailButton = ({ email }: ResendEmailButtonProps) => {
  const [time, setTime] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time]);

  const resendVerificationEmail = async () => {
    setSuccess(null);
    setError(null);
    setIsLoading(true);

    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: '/dashboard',
    });
    setIsLoading(false);
    setTime(60);

    if (error) {
      setError(error.message || 'Something went wrong...');
    } else {
      setSuccess('Verification email was sent successfully');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant="ghost"
        onClick={resendVerificationEmail}
        disabled={isLoading || time > 0}
        className="text-neutral-500 hover:text-black hover:bg-zinc-200"
      >
        {isLoading ? (
          <Spinner>Sending...</Spinner>
        ) : time > 0 ? (
          `Wait ${time}s to resend again`
        ) : (
          'Resend Email'
        )}
      </Button>

      {success && (
        <p className="text-xs text-green-600 font-medium">{success}</p>
      )}
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
};

export default ResendEmailButton;
