import { CircleUserRound, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const HeaderActions = () => {
  return (
    <div className="flex flex-row gap-3 items-center">
      <Link href="/cart" className="p-2">
        <ShoppingCart size={24} strokeWidth={1.75} />
      </Link>
      <Link href="/profile" className="p-2">
        <CircleUserRound size={24} strokeWidth={1.75} />
      </Link>
    </div>
  );
};

export default HeaderActions;
