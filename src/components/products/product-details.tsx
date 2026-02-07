'use client';

import { RotateCcw, ShieldCheck, Star, Truck } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import StarRating from '@/components/ui/star-rating';
import type { Category, Color, Product, Size } from '@/generated/prisma/client';
import { useCartStore } from '@/store/cart-store';
import { useWishlistStore } from '@/store/wishlist-store';

type ProductWithRelations = Product & {
  category: Category;
  colors: Color[];
  sizes: Size[];
};

interface ProductDetailsProps {
  product: ProductWithRelations;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const discountPercent =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100,
        )
      : null;

  const wishlistItems = useWishlistStore((state) => state.items);
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const removeFromWishlist = useWishlistStore((state) => state.removeItem);
  const isInWishlist = wishlistItems.some((i) => i.id === product.id);

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0],
      });
      toast.success('Added to wishlist');
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.info('Choose size and color first');
      return;
    }

    addItem({
      cartItemId: `${product.id}-${selectedColor}-${selectedSize}`,
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    });
    toast.success(`Added ${product.name} (${selectedSize}) to cart`);
  };

  return (
    <div className="flex flex-col text-start">
      <span className="text-sm font-bold uppercase text-neutral-400 mb-2 text-start">
        {product.brand} — {product.category.name}
      </span>

      <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 text-black text-start">
        {product.name}
      </h1>
      <div className="flex gap-4 mb-4 text-start flex-col">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-3xl font-bold text-black">
            ${product.price}
          </span>
          {product.oldPrice && (
            <span className="text-2xl font-bold text-black/30 line-through">
              ${product.oldPrice}
            </span>
          )}
          {discountPercent && discountPercent > 0 && (
            <span className="bg-[#FF3333]/10 text-[#FF3333] px-3 py-1 text-sm font-medium rounded-full">
              -{discountPercent}%
            </span>
          )}
        </div>
        <span>
          <StarRating rating={product.rating} />
        </span>
      </div>

      <p className="text-neutral-600 leading-relaxed mb-8">
        {product.description}
      </p>

      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase mb-4 text-black/60 text-start">
          Select Color
        </h3>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => setSelectedColor(color.name)}
              className={`w-10 h-10 rounded-full border-2 transition-all p-0.5 ${
                selectedColor === color.name
                  ? 'border-black'
                  : 'border-neutral-100'
              }`}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-sm font-bold uppercase mb-4 text-black/60 text-start">
          Choose Size
        </h3>
        <div className="flex flex-wrap gap-3 text-start">
          {product.sizes.map((size) => (
            <button
              key={size.id}
              type="button"
              onClick={() => setSelectedSize(size.name)}
              className={`px-6 py-3 border rounded-full text-sm font-bold transition-all italic ${
                selectedSize === size.name
                  ? 'bg-black text-white border-black'
                  : 'border-neutral-200 text-black'
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 bg-black text-white py-5 rounded-full font-bold text-lg hover:bg-neutral-800 transition-all active:scale-95 cursor-pointer"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`px-5 flex flex-col items-center justify-center gap-1 rounded-full border-2 transition-all cursor-pointer active:scale-95 ${
            isInWishlist
              ? 'bg-amber-50 border-amber-300 text-amber-500'
              : 'border-neutral-200 text-neutral-400 hover:border-amber-200 hover:text-amber-400 hover:bg-amber-50/50'
          }`}
        >
          <Star size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
          <span className="text-[10px] font-bold uppercase tracking-wide">
            {isInWishlist ? 'Saved' : 'Save'}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-neutral-100 text-start">
        <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
          <Truck size={18} /> Free Delivery
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
          <RotateCcw size={18} /> 30-Day Returns
        </div>
        <div className="flex items-center gap-3 text-xs text-neutral-500 font-medium">
          <ShieldCheck size={18} /> Warranty
        </div>
      </div>
    </div>
  );
}
