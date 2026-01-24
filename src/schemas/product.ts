import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  price: z.coerce.number().min(0.01, 'Min price is $0.01'),
  description: z.string().min(10, 'Min 10 characters'),
  gender: z.enum(['MALE', 'FEMALE', 'UNISEX']),
  brand: z.string().min(1, 'Brand is required'),
  categoryId: z.coerce.number().int().positive('Select category'),
  styleId: z.coerce.number().int().positive('Select style'),
  images: z.array(z.string()).min(1, 'Add at least one image'),
  colorIds: z.array(z.number().int().positive()).min(1, 'Select colors'),
  sizeIds: z.array(z.number().int().positive()).min(1, 'Select sizes'),
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;

export const ProductFilterSchema = z.object({
  category: z.string().optional(),
  dressStyle: z.string().optional(),

  minPrice: z.coerce.number().min(0).default(0),
  maxPrice: z.coerce.number().min(0).default(500),

  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),

  sort: z
    .enum(['newest', 'price_asc', 'price_desc', 'rating'])
    .default('newest'),
});

export type ProductFilterInput = z.infer<typeof ProductFilterSchema>;
