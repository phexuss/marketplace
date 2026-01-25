import ProductCard from '@/components/products/product-card';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { ProductCarousel } from './product-carousel';

interface ProductListProps {
  title?: string;
  limit?: number;
}

const ProductList = async ({ title, limit = 4 }: ProductListProps) => {
  const products = await prisma.product.findMany({
    take: limit,
  });

  return (
    <section className="py-10 md:py-16">
      {title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-center mb-8 md:mb-14">
          {title}
        </h2>
      )}

      <div className="md:hidden">
        <ProductCarousel products={products} />
      </div>

      <div className="hidden md:grid md:grid-cols-4 lg:gap-5 px-24">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-9">
        <Button
          variant="ghost"
          className="bg-transparent text-black text-sm md:text-[1rem] px-13.5 py-4 border border-[#E6E6E6] rounded-full"
        >
          View All
        </Button>
      </div>
    </section>
  );
};

export default ProductList;
