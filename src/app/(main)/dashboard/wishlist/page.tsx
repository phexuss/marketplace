'use client';

import { ArrowLeftIcon, Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { useWishlistStore } from '@/store/wishlist-store';

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  const handleRemove = (id: number, name: string) => {
    removeItem(id);
    toast.success(`Removed ${name} from wishlist`);
  };

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 bg-white text-neutral-900">
      <div className="flex items-center gap-3">
        <Star size={24} className="text-amber-500" />
        <h1 className="text-2xl font-bold">My Wishlist</h1>
        <span className="text-neutral-400">({items.length} items)</span>
      </div>

      {items.length === 0 ? (
        <div className="border border-neutral-100 rounded-2xl p-12 text-center space-y-4">
          <Star size={48} className="mx-auto text-neutral-200" />
          <p className="text-neutral-500">Your wishlist is empty</p>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-4 border border-neutral-100 rounded-xl hover:border-neutral-200 transition-colors"
            >
              <Link href={`/products/${item.slug}`} className="shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={125}
                  height={125}
                  className="w-24 h-24 object-contain bg-hero-bg rounded-lg p-2"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.slug}`}
                  className="font-semibold hover:underline block truncate"
                >
                  {item.name}
                </Link>
                <p className="text-lg font-bold mt-1">
                  ${item.price.toFixed(2)}
                </p>
                <Link
                  href={`/products/${item.slug}`}
                  className="inline-block mt-3 px-4 py-2 bg-black text-white text-sm rounded-full font-medium hover:bg-neutral-800 transition-colors"
                >
                  View Product
                </Link>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(item.id, item.name)}
                className="self-start p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="pt-4">
        <Link
          href="/dashboard"
          className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <div className="flex flex-row items-center gap-2">
            <ArrowLeftIcon size={16} /> Back to Dashboard
          </div>
        </Link>
      </div>
    </main>
  );
}
