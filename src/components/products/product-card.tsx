import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/components/ui/star-rating';
import type { Product } from '@/generated/prisma/client';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const mainImage = product.images?.[0] ?? '/placeholder.jpg';

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price);

  const formattedOldPrice = product.oldPrice
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(product.oldPrice)
    : null;

  return (
    <Link href={`/products/${product.slug}`} className="group flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden  rounded-2xl md:rounded-4xl bg-hero-bg">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-90  scale-80"
          sizes="(max-width: 768px) 45vw, 25vw"
        />
      </div>
      <div className="flex flex-col mt-2 sm:mt-3 md:mt-4">
        <h3 className="font-bold text-sm sm:text-base md:text-xl leading-tight line-clamp-1 text-black">
          {product.name}
        </h3>
        <div className="mt-1 sm:mt-2">
          <StarRating rating={product.rating} />
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 mt-1 sm:mt-2 flex-wrap">
          <span className="font-bold text-base sm:text-lg md:text-2xl text-black">
            {formattedPrice}
          </span>
          {formattedOldPrice && (
            <>
              <span className="font-bold text-base sm:text-lg md:text-2xl text-black/40 line-through">
                {formattedOldPrice}
              </span>
              {product.discount && product.discount > 0 && (
                <span className="bg-[#FF3333]/10 text-[#FF3333] px-1.5 py-0.5 sm:px-2.5 sm:py-1 md:px-3.5 md:py-1.5 text-[10px] sm:text-xs font-medium rounded-full">
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
