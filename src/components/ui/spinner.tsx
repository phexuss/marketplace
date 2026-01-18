import { LoaderPinwheel } from 'lucide-react';

import { cn } from '@/lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <output>
      <LoaderPinwheel
        aria-label="Loading"
        className={cn('size-4 animate-spin', className)}
        {...props}
      />
    </output>
  );
}

export { Spinner };
