'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

const LogoutEverywhereButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogoutEverywhere = async () => {
    setLoading(true);
    const { error } = await authClient.revokeSessions();
    setLoading(false);

    if (error) {
      toast.error(error.message || 'Failed to log out everywhere');
    } else {
      toast.success('Logged out from all devices');
      router.push('/sign-in');
    }
  };
  return (
    <div>
      <Button
        onClick={handleLogoutEverywhere}
        className={`${loading ? 'disabled' : ''}`}
      >
        {loading ? 'Logging out...' : 'Log out everywhere'}
      </Button>
    </div>
  );
};

export default LogoutEverywhereButton;
