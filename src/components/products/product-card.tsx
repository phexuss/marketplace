import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/generated/prisma/client';

interface ProductCardProps {
  product: Product;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = rating >= star;
          const isHalf = !isFull && rating >= star - 0.5;

          return (
            <div key={star} className="relative">
              <Star size={16} className="text-neutral-300" strokeWidth={1.5} />
              <div
                className="absolute inset-0 overflow-hidden text-yellow-400"
                style={{ width: isFull ? '100%' : isHalf ? '50%' : '0%' }}
              >
                <Star size={16} fill="currentColor" strokeWidth={1.5} />
              </div>
            </div>
          );
        })}
      </div>

      <span className="text-sm font-bold text-black flex items-center gap-1">
        {rating.toFixed(1)}
        <span className="text-neutral-400 font-medium">/5</span>
      </span>
    </div>
  );
};

const ProductCard = ({ product }: ProductCardProps) => {
  const mainImage = product.images?.[0] ?? '/placeholder.jpg';

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOldPrice = product.oldPrice
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(product.oldPrice)
    : null;

  return (
    <Link href={`/products/${product.slug}`} className="group flex flex-col">
      <div className="relative aspect-2/3 w-full overflow-hidden rounded-[13px] sm:rounded-[17px] md:rounded-5 bg-[#F0EEED]">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
        />
      </div>
      <div className="flex flex-col mt-2 sm:mt-3 md:mt-4">
        <h3 className="font-bold text-sm sm:text-base md:text-xl leading-tight line-clamp-1 text-black">
          {product.name}
        </h3>
        <div className="mt-1 sm:mt-1.5 md:mt-2">
          <StarRating rating={product.rating} />
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 mt-1 sm:mt-1.5 md:mt-2 flex-wrap">
          <span className="font-bold text-base sm:text-lg md:text-2xl text-black">
            {formattedPrice}
          </span>
          {formattedOldPrice && (
            <>
              <span className="font-bold text-base sm:text-lg md:text-2xl text-black/40 line-through">
                {formattedOldPrice}
              </span>
              {product.discount && product.discount > 0 && (
                <span className="bg-[#FF3333]/10 text-[#FF3333] px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3.5 md:py-1.5 text-[10px] sm:text-xs font-medium rounded-full">
                  -{product.discount}%
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
