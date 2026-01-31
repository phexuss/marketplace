'use server';

import { sendEmail } from '@/lib/email';
import { type NewsletterInput, NewsletterSchema } from '@/schemas/newsletter';

export async function subscribeAction(data: NewsletterInput) {
  const result = NewsletterSchema.safeParse(data);
  if (!result.success) return { error: 'Invalid data' };

  try {
    await sendEmail({
      to: result.data.email,
      subject: 'Welcome to Shop.co!',
      text: 'Congratulations! You have successfully subscribed to our newsletter.',
    });
    return { success: true };
  } catch (e) {
    return { error: 'Something went wrong' };
  }
}
