import { z } from "zod";

export const ProductFilterSchema = z.object({
  category: z.string().optional(),
  dressStyle: z.string().optional(),

  minPrice: z.coerce.number().min(0).default(0),
  maxPrice: z.coerce.number().min(0).default(500),

  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),

  sort: z
    .enum(["newest", "price_asc", "price_desc", "rating"])
    .default("newest"),
});

export type ProductFilterInput = z.infer<typeof ProductFilterSchema>;
