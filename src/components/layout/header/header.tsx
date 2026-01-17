import Link from 'next/link';
import { BurgerButton } from '@/components/layout/header/burger-btn';
import DesktopNav from '@/components/layout/header/desktop-nav';
import HeaderActions from '@/components/layout/header/header-actions';
import Search from '@/components/layout/header/search';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between gap-4 px-4 md:h-20 md:gap-8 lg:px-6">
          <div className="flex items-center gap-3 shrink-0">
            <BurgerButton />
            <Link
              href="/"
              className="font-display text-xl font-extrabold uppercase tracking-tight md:text-2xl"
            >
              shop.co
            </Link>
          </div>
          <DesktopNav />
          <Search />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
};

export default Header;
