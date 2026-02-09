import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetails from '@/components/products/product-details';
import ProductGallery from '@/components/products/product-gallery';
import prisma from '@/lib/prisma';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for could not be found.',
    };
  }

  const imageUrl = product.images[0] || '/image-not-found.png';
  const description =
    product.description.slice(0, 155) +
    (product.description.length > 155 ? '...' : '');
  const price = product.oldPrice
    ? `Now $${product.price} (was $${product.oldPrice})`
    : `$${product.price}`;

  return {
    title: product.name,
    description: `${description} ${price}`,
    keywords: [
      product.name,
      product.brand,
      product.category?.name,
      'clothing',
      'fashion',
    ].filter(Boolean),
    openGraph: {
      title: `${product.name} | Shop.co`,
      description: `${description} ${price}`,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Shop.co`,
      description: `${description} ${price}`,
      images: [imageUrl],
    },
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
    <div className="max-w-7xl mx-auto px-4 py-10 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ProductGallery images={product.images} name={product.name} />
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default ProductPage;
