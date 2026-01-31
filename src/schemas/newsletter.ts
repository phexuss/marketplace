import { z } from 'zod';

export const NewsletterSchema = z.object({
  email: z.email('Invalid email adress'),
});

export type NewsletterInput = z.infer<typeof NewsletterSchema>;
