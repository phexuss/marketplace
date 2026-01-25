'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { Product } from '@/generated/prisma/client';
import ProductCard from './product-card';

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel = ({ products }: ProductCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true,
      }}
      className="w-full px-3.5 md:ml-5"
    >
      <CarouselContent className="-ml-3 gap-3">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="pl-3 basis-[45%] sm:basis-[40%]"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
