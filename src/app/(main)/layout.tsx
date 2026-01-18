import Header from '@/components/layout/header/header';
import TopBanner from '@/components/layout/top-banner';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBanner />
      <Header />
      <main>{children}</main>
    </>
  );
}
