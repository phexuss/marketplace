'use server';

import { revalidatePath } from 'next/cache';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { CreateProductSchema } from '@/schemas/product';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover',
});

export async function createProductAction(
  formData: FormData,
  images: string[],
  colorIds: number[],
  sizeIds: number[],
) {
  const rawData = {
    name: formData.get('name') as string,
    price: formData.get('price') as string,
    description: formData.get('description') as string,
    gender: formData.get('gender') as string,
    brand: formData.get('brand') as string,
    categoryId: formData.get('categoryId') as string,
    styleId: formData.get('styleId') as string,
    images,
    colorIds,
    sizeIds,
  };

  const validation = CreateProductSchema.safeParse(rawData);
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const { name, price, description, gender, brand, categoryId, styleId } =
    validation.data;

  const slug = `${brand}-${name}`
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  const existing = await prisma.product.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  try {
    const stripeProduct = await stripe.products.create({
      name: name,
      description: description,
      images: images,
      default_price_data: {
        currency: 'usd',
        unit_amount: Math.round(price * 100),
      },
      metadata: {
        slug: finalSlug,
        brand: brand,
      },
    });

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        brand,
        description,
        price,
        gender,
        images,
        categoryId,
        styleId,

        stripeProductId: stripeProduct.id,
        stripePriceId: stripeProduct.default_price as string,

        colors: { connect: colorIds.map((id) => ({ id })) },
        sizes: { connect: sizeIds.map((id) => ({ id })) },
      },
    });

    revalidatePath('/admin');
    revalidatePath('/shop');
    revalidatePath('/');

    return { success: true, id: product.id };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product via Stripe/DB' };
  }
}
