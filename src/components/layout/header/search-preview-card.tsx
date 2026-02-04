import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/components/ui/star-rating';

interface SearchPreviewCardProps {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  images: string[];
  rating: number;
  brand: string;
}

export function SearchPreviewCard({
  name,
  slug,
  price,
  oldPrice,
  discount,
  images,
  rating,
  brand,
}: SearchPreviewCardProps) {
  const mainImage = images?.[0] ?? '/image-not-found.png';
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);

  return (
    <Link
      href={`/products/${slug}`}
      className="flex gap-3 md:gap-4 p-2 md:p-3 rounded-lg hover:bg-muted/50 transition-colors group"
    >
      <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 overflow-hidden rounded-lg bg-hero-bg shrink-0">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-90 scale-80"
          sizes="64px"
        />
      </div>
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <h4 className="font-semibold text-sm md:text-base lg:text-lg leading-tight line-clamp-1 text-black">
          {name}
        </h4>
        <p className="text-xs md:text-sm text-muted-foreground">{brand}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-bold text-sm md:text-base lg:text-lg text-black">
            {formattedPrice}
          </span>
          {oldPrice && discount && (
            <span className="bg-[#FF3333]/10 text-[#FF3333] px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs font-medium rounded-full">
              -{discount}%
            </span>
          )}
        </div>
        <div className="mt-1 lg:mt-1.5">
          <div className="scale-75 md:scale-90 lg:scale-100 origin-left">
            <StarRating rating={rating} />
          </div>
        </div>
      </div>
    </Link>
  );
}
