import { cn } from '@/lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'output'>) {
  return (
    <output
      aria-label="Loading"
      className={cn('relative size-10', className)}
      {...props}
    >
      <div className="absolute inset-0 rounded-full border-2 border-border" />
      <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-foreground" />
      <div
        className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-foreground/30"
        style={{ animationDuration: '1.5s' }}
      />
    </output>
  );
}

export { Spinner };
