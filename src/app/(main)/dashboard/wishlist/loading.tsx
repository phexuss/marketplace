import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';

export default function WishlistLoading() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 bg-white p-4 text-neutral-900 sm:p-6">
      <div className="flex items-center gap-3">
        <Star size={24} className="text-amber-500" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex gap-4 rounded-xl border border-neutral-100 p-4"
          >
            <Skeleton className="h-24 w-24 shrink-0 rounded-lg" />
            <div className="min-w-0 flex-1 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-9 w-32 rounded-full" />
            </div>
            <Skeleton className="h-9 w-9 shrink-0 rounded-lg" />
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Skeleton className="h-5 w-40" />
      </div>
    </div>
  );
}
