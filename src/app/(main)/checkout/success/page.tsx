import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Stripe } from 'stripe';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { ClearCart } from './clear-cart';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) redirect('/');

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status !== 'paid') {
    return <div>Payment failed or pending.</div>;
  }

  const orderId = session.metadata?.orderId;

  if (orderId) {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        stripePaymentIntentId: session.payment_intent as string,
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <div className="size-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
        <CheckCircle className="size-10 text-green-600" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-main uppercase">
          Order Confirmed!
        </h1>
        <p className="text-neutral-500 max-w-md mx-auto">
          Thank you for your purchase. We have received your order and payment.
          You can track your order in the dashboard.
        </p>
      </div>

      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button variant="outline" className="rounded-full h-12 px-8">
            Go to Dashboard
          </Button>
        </Link>
        <Link href="/shop">
          <Button className="rounded-full h-12 px-8 bg-black text-white hover:bg-black/80">
            Continue Shopping
          </Button>
        </Link>
      </div>
      <ClearCart />
    </div>
  );
}
