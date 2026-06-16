'use client';

import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createCheckoutSession } from '@/app/actions/checkout';
import { Button } from '@/components/ui/button';
import { DynamicBreadcrumbs } from '@/components/ui/dynamic-breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cart-store';

const CartPage = () => {
  const { items, removeItem, updateQuantity } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const discount = subtotal * 0.2;
  const delivery = 15;
  const total = subtotal - discount + delivery;

  const handleCheckout = async () => {
    setIsLoading(true);

    const cartPayload = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));

    const result = await createCheckoutSession(cartPayload);

    if (result.redirectTo) {
      window.location.href = result.redirectTo;
      return;
    }

    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
      return;
    }

    if (result.url) {
      window.location.href = result.url;
    }
  };

  return (
    <div className="flex px-4 flex-col md:px-25 pb-20">
      <Separator />
      <DynamicBreadcrumbs steps={[{ label: 'Cart' }]} />

      <h2 className="uppercase font-extrabold font-main text-[2rem] md:text-[2.5rem] mb-8">
        your cart
      </h2>

      {items.length === 0 ? (
        <div className="py-20 text-center border border-dashed rounded-4xl">
          <p className="text-xl opacity-50 mb-6">Your cart is empty...</p>
          <Link
            href="/"
            className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-4 border border-black/10 rounded-4xl p-4 md:p-6">
            {items.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-4 pb-4 border-b border-black/10 last:border-0 last:pb-0"
              >
                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-hero-bg rounded-[13px] overflow-hidden shrink-0">
                  <Link href={item.slug ? `/products/${item.slug}` : '#'}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover scale-80 hover:scale-85 transition-transform duration-300"
                    />
                  </Link>
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        href={item.slug ? `/products/${item.slug}` : '#'}
                        className="group"
                      >
                        <h3 className="font-bold text-base md:text-xl uppercase group-hover:underline decoration-1 underline-offset-4 transition-all">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm">
                        Size: <span className="opacity-70">{item.size}</span>
                      </p>
                      <p className="text-sm">
                        Color: <span className="opacity-70">{item.color}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.cartItemId)}
                      className="text-red-500 hover:scale-110 transition-transform"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-xl md:text-2xl font-semibold">
                      ${item.price}
                    </span>

                    <div className="flex items-center gap-3 md:gap-4 bg-[#F0EEED] px-4 py-2 rounded-full font-semibold">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="flex items-center justify-center"
                      >
                        <Minus size={16} className="cursor-pointer" />
                      </button>
                      <span className="text-sm w-5 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="flex items-center justify-center"
                      >
                        <Plus size={16} className="cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-black/10 rounded-4xl p-6 sticky top-24 flex flex-col gap-6">
            <h3 className="text-2xl font-semibold uppercase">Order Summary</h3>

            <div className="flex flex-col gap-4 font-medium text-lg">
              <div className="flex justify-between opacity-80">
                <span>Subtotal</span>
                <span className="text-black font-semibold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Discount (-20%)</span>
                <span className="font-semibold"> - ${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between opacity-80">
                <span>Delivery Fee</span>
                <span className="text-black  font-semibold">${delivery}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-2xl font-black">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-black text-white py-4 rounded-full font-semibold uppercase flex items-center justify-center gap-2 hover:bg-black/80 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Redirecting...' : 'Checkout'}
              {!isLoading && <ArrowRight size={20} />}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
