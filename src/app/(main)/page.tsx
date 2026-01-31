import ProductList from '@/components/products/product-list';
import Hero from '@/components/sections/hero/hero';
import { Separator } from '@/components/ui/separator';
import prisma from '@/lib/prisma';

export default async function Home() {
  const [newArrivals, topSelling] = await Promise.all([
    prisma.product.findMany({
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        colors: true,
        sizes: true,
      },
    }),
    prisma.product.findMany({
      take: 4,
      orderBy: { price: 'asc' },
      include: {
        category: true,
        colors: true,
        sizes: true,
      },
    }),
  ]);

  return (
    <main>
      <Hero />
      <div className="xl:px-25">
        <ProductList
          title="new arrivals"
          products={newArrivals}
          slider={true}
        />
        <div className="flex xl:px-25">
          <Separator />
        </div>
        <ProductList title="top selling" products={topSelling} slider={true} />
      </div>
      <div className="flex xl:px-25 pb-10 xl:pb-20">
        <Separator />
      </div>
    </main>
  );
}
