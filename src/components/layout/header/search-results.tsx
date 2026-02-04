'use server';

import prisma from '@/lib/prisma';

export async function searchProducts(query: string) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { brand: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      oldPrice: true,
      discount: true,
      images: true,
      rating: true,
      brand: true,
    },
    take: 6,
    orderBy: {
      rating: 'desc',
    },
  });

  return products;
}
