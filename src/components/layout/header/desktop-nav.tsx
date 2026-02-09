import Link from 'next/link';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop?onSale=true', label: 'On Sale' },
  { href: '/shop?newArrival=true', label: 'New Arrivals' },
];

const DesktopNav = () => {
  return (
    <nav aria-label="Main navigation" className="hidden md:flex items-center">
      <ul className="flex items-center gap-1 lg:gap-2">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground lg:px-4 lg:text-base"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopNav;
