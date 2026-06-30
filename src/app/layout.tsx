import type { Metadata } from 'next';
import { Encode_Sans_Expanded, Reddit_Sans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { SmoothScroll } from '@/components/providers/smooth-scroll';
import { Toaster } from '@/components/ui/sonner';

const mainFont = Reddit_Sans({
  variable: '--font-main',
  subsets: ['latin'],
});

const displayFont = Encode_Sans_Expanded({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  title: {
    default: 'Shop.co | Premium Clothing',
    template: '%s | Shop.co',
  },
  description:
    'Discover premium clothing and accessories at Shop.co. Browse curated collections of stylish fashion for every occasion. Free shipping on orders over $100.',
  keywords: [
    'clothing',
    'fashion',
    'premium clothing',
    'accessories',
    'online shopping',
    'mens fashion',
    'womens fashion',
    'style',
    'apparel',
    'shop online',
  ],
  authors: [{ name: 'Shop.co' }],
  creator: 'Shop.co',
  publisher: 'Shop.co',
  openGraph: {
    title: 'Shop.co | Premium Clothing & Accessories',
    description:
      'Discover premium clothing and accessories at Shop.co. Browse curated collections of stylish fashion for every occasion.',
    url: process.env.NEXT_PUBLIC_BASE_URL!,
    siteName: 'Shop.co',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Shop.co - Premium Clothing & Accessories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop.co | Premium Clothing & Accessories',
    description:
      'Discover premium clothing and accessories at Shop.co. Browse curated collections of stylish fashion for every occasion.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SmoothScroll>
        <body
          className={`${mainFont.variable} ${displayFont.variable} antialiased font-main`}
        >
          <NextTopLoader
            color="#000000"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow={false}
          />
          {children}
          <Toaster />
        </body>
      </SmoothScroll>
    </html>
  );
}
