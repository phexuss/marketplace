import { z } from "zod";

export const AddToCartSchema = z.object({
  productId: z.number().int("ID must be an integer"),

  quantity: z
    .number()
    .int()
    .min(1, "Minimum 1 item")
    .max(99, "Maximum 99 items"),

  color: z.string().min(1, "Please select a color"),

  size: z.string().min(1, "Please select a size"),
});

export type AddToCartInput = z.infer<typeof AddToCartSchema>;
