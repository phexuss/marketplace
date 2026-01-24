import ProductCard from '@/components/products/product-card';
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

      <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
