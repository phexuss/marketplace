'use client';

import { CircleUserRound, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart-store';

const HeaderActions = () => {
  const items = useCartStore((state) => state.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex items-center gap-1 shrink-0">
      <Link
        href="/cart"
        data-cart-target="true"
        aria-label="Shopping cart"
        className="relative p-2 text-foreground/80 transition-colors hover:text-foreground group"
      >
        <div className="relative transition-all duration-300 group-hover:scale-110">
          <ShoppingCart
            className="size-5 md:size-6 transition-opacity duration-300 group-hover:opacity-100 opacity-80"
            strokeWidth={1.75}
          />
          {totalQuantity > 0 && (
            <span className="absolute -right-1 -top-1 flex h-3.75 min-w-3.75 items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white">
              {totalQuantity > 9 ? '9+' : totalQuantity}
            </span>
          )}
        </div>
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
