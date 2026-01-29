import { ProductFilters } from '@/components/products/product-filters';
import ProductList from '@/components/products/product-list';
import { DynamicBreadcrumbs } from '@/components/ui/dynamic-breadcrumbs';
import { Separator } from '@/components/ui/separator';
import type { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

interface ShopPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const ShopPage = async ({ searchParams }: ShopPageProps) => {
  const [categories, colors, sizes, styles] = await Promise.all([
    prisma.category.findMany(),
    prisma.color.findMany(),
    prisma.size.findMany({ orderBy: { id: 'asc' } }),
    prisma.dressStyle.findMany(),
  ]);

  const s = await searchParams;

  const activeStyle = s.styles ? s.styles.split(',')[0] : null;

  const pageTitle = activeStyle || 'Shop';

  const breadcrumbSteps = [
    { label: 'Shop', href: '/shop' },
    ...(activeStyle
      ? [{ label: activeStyle, href: `/shop?styles=${activeStyle}` }]
      : []),
  ];

  const inFilter = (val?: string) =>
    val ? { name: { in: val.split(',') } } : undefined;

  const someInFilter = (val?: string) =>
    val ? { some: { name: { in: val.split(',') } } } : undefined;

  const where: Prisma.ProductWhereInput = {
    price: {
      gte: Number(s.minPrice) || 0,
      lte: Number(s.maxPrice) || 2000,
    },
    category: inFilter(s.categories),
    style: inFilter(s.styles),
    colors: someInFilter(s.colors),
    sizes: someInFilter(s.sizes),
  };

  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
      colors: true,
      sizes: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex px-4 md:px-12.5 xl:px-25 flex-col pb-20">
      <Separator />
      <div className="py-2">
        <DynamicBreadcrumbs steps={breadcrumbSteps} />
      </div>

      <div className="flex justify-between items-center my-6 xl:hidden">
        <h2 className="uppercase font-bold font-main text-3xl">{pageTitle}</h2>
        <ProductFilters
          categories={categories}
          colors={colors}
          sizes={sizes}
          styles={styles}
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-5 lg:gap-8 mt-4 text-start">
        <aside className="hidden xl:block w-73.5 shrink-0">
          <ProductFilters
            categories={categories}
            colors={colors}
            sizes={sizes}
            styles={styles}
          />
        </aside>

        <main className="flex-1">
          <div className="hidden xl:flex justify-between items-center mb-6">
            <h2 className="uppercase font-bold font-main text-3xl xl:text-4xl text-black">
              {pageTitle}
            </h2>
            <div className="text-sm text-neutral-400">
              Showing {products.length} products
            </div>
          </div>

          <ProductList products={products} slider={false} />
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
