import { CircleUserRound, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const HeaderActions = () => {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <Link
        href="/cart"
        aria-label="Shopping cart"
        className="relative p-2 text-foreground/80 transition-colors hover:text-foreground"
      >
        <ShoppingCart
          className="size-5 md:size-6 transition-all duration-300 hover:scale-110 hover:opacity-100 opacity-80"
          strokeWidth={1.75}
        />
      </Link>
      <Link
        href="/dashboard"
        aria-label="User profile"
        className="p-2 text-foreground/80 transition-colors hover:text-foreground"
      >
        <CircleUserRound
          className="size-5 md:size-6 transition-all duration-300 hover:scale-110 hover:opacity-100 opacity-80"
          strokeWidth={1.75}
        />
      </Link>
    </div>
  );
};

export default HeaderActions;
