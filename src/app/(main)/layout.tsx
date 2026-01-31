import Header from '@/components/layout/header/header';
import TopBanner from '@/components/layout/top-banner';
import Footer from '@/components/sections/footer/footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBanner />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
