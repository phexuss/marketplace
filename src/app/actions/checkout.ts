'use server';

import { headers } from 'next/headers';
import { Stripe } from 'stripe';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

interface CartItem {
  id: number;
  quantity: number;
  size?: string;
  color?: string;
}

export async function createCheckoutSession(items: CartItem[]) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { error: 'Unauthorized' };
    }

    const productIds = items.map((item) => item.id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    let totalAmount = 0;
    const line_items = [];

    for (const item of items) {
      const product = products.find((p) => p.id === item.id);
      if (!product) continue;

      const priceInCents = Math.round(product.price * 100);
      totalAmount += product.price * item.quantity;

      if (product.stripePriceId) {
        line_items.push({
          price: product.stripePriceId,
          quantity: item.quantity,
        });
      } else {
        line_items.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: product.images.slice(0, 1),
              metadata: { size: item.size || '', color: item.color || '' },
            },
            unit_amount: priceInCents,
          },
          quantity: item.quantity,
        });
      }
    }

    totalAmount += 15;
    line_items.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Delivery Fee' },
        unit_amount: 1500,
      },
      quantity: 1,
    });

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total: totalAmount,
        status: 'PENDING',
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.id);
            return {
              productId: item.id,
              quantity: item.quantity,
              price: product ? product.price : 0,
              selectedSize: item.size,
              selectedColor: item.color,
            };
          }),
        },
      },
    });

    const stripeSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart?canceled=true`,
      metadata: {
        orderId: order.id,
      },
    });

    return { url: stripeSession.url };
  } catch (error) {
    console.error('Checkout error:', error);
    return { error: 'Failed to create checkout session' };
  }
}
