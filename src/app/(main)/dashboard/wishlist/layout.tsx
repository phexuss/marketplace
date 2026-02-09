import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wishlist',
  description:
    'View and manage your wishlist items. Save your favorite products for later.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
