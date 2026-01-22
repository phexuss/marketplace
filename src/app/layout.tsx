import type { Metadata } from 'next';
import { Encode_Sans_Expanded, Reddit_Sans } from 'next/font/google';
import './globals.css';
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
  title: 'My Project',
  description: 'Welcome to my app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.variable} ${displayFont.variable} antialiased font-main`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
