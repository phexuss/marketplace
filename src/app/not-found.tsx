'use client';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <button type="button" onClick={handleClick}>
        Back
      </button>
    </div>
  );
};

export default NotFound;
