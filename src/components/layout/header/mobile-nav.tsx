import Link from 'next/link';
import { BurgerButton } from '@/components/layout/header/burger-btn';
import HeaderActions from '@/components/layout/header/header-actions';
import Search from '@/components/layout/header/search';

const MobileNav = () => {
  return (
    <nav className="relative flex items-center justify-between px-4 py-6 gap-4 md:gap-8">
      <div className="flex flex-row gap-4 items-center shrink-0">
        <BurgerButton />
        <Link
          href={'/'}
          className="font-display text-2xl uppercase font-extrabold"
        >
          shop.co
        </Link>
      </div>

      <Search />

      <div className="shrink-0">
        <HeaderActions />
      </div>
    </nav>
  );
};

export default MobileNav;
