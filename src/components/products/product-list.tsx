import Link from 'next/link';
import ProductCard from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import type { Product } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';
import { ProductCarousel } from './product-carousel';

interface ProductListProps {
  title?: string;
  limit?: number;
  products?: Product[];
  slider?: boolean;
}

const ProductList = async ({
  title,
  limit = 4,
  products: initialProducts,
  slider = true,
}: ProductListProps) => {
  const products =
    initialProducts ||
    (await prisma.product.findMany({
      take: limit,
      include: {
        category: true,
        colors: true,
        sizes: true,
      },
    }));

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-50">
        <p className="text-xl font-medium">No products found</p>
      </div>
    );
  }

  return (
    <section className="py-5 md:py-16">
      {title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-8 md:mb-14 uppercase">
          {title}
        </h2>
      )}

      <div className="md:hidden px-4">
        {slider ? (
          <ProductCarousel products={products} />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products?.map((item, index) => (
              <ProductCard
                key={item.id}
                product={item}
                isPriority={index < 4}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-5 px-2.5">
        {products.map((item, index) => (
          <ProductCard key={item.id} product={item} isPriority={index < 4} />
        ))}
      </div>

      {!initialProducts && (
        <div className="flex items-center justify-center mt-9">
          <Link href="/shop">
            <Button
              variant="ghost"
              className="px-13.5 py-4 border border-[#E6E6E6] rounded-full hover:bg-neutral-100 transition-all"
            >
              View All
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default ProductList;
