import { notFound } from 'next/navigation';
import ProductDetails from '@/components/products/product-details';
import ProductGallery from '@/components/products/product-gallery';
import prisma from '@/lib/prisma';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | Marketplace`,
    description: product.description,
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      colors: true,
      sizes: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductGallery images={product.images} name={product.name} />
        <ProductDetails product={product} />
      </div>
    </main>
  );
};

export default ProductPage;
