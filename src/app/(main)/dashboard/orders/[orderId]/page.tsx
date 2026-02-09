import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Package,
  Truck,
  XCircle,
} from 'lucide-react';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Order Details',
  description:
    'View your order details, track shipment status, and see order summary.',
  robots: {
    index: false,
    follow: false,
  },
};

const statusConfig = {
  PENDING: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-700',
    icon: Clock,
  },
  PAID: {
    label: 'Paid',
    color: 'bg-green-100 text-green-700',
    icon: CheckCircle,
  },
  SHIPPED: {
    label: 'Shipped',
    color: 'bg-blue-100 text-blue-700',
    icon: Truck,
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-700',
    icon: XCircle,
  },
};

export default async function OrderPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect('/sign-in');
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order || order.userId !== session.user.id) {
    notFound();
  }

  const status = statusConfig[order.status as keyof typeof statusConfig];
  const StatusIcon = status.icon;

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 bg-white text-neutral-900">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>
      </div>

      <div className="border border-neutral-100 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Order Details</h1>
            <p className="text-sm text-neutral-500">
              Order #{order.id.slice(0, 8)}
            </p>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status.color}`}
          >
            <StatusIcon size={16} />
            <span className="text-sm font-medium">{status.label}</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="bg-neutral-50 rounded-xl p-4 space-y-2">
            <p className="text-neutral-500">Order Date</p>
            <p className="font-medium">
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          {order.stripePaymentIntentId && (
            <div className="bg-neutral-50 rounded-xl p-4 space-y-2">
              <p className="text-neutral-500">Payment ID</p>
              <p className="font-medium font-mono text-xs truncate">
                {order.stripePaymentIntentId}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="border border-neutral-100 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Package size={20} className="text-neutral-400" />
          <h2 className="text-lg font-semibold">
            Items ({order.items.length})
          </h2>
        </div>

        <div className="divide-y divide-neutral-100">
          {order.items.map((item) => (
            <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              {item.product.images[0] && (
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-lg object-contain bg-hero-bg"
                />
              )}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="font-medium hover:underline"
                >
                  {item.product.name}
                </Link>
                <div className="flex flex-wrap gap-2 mt-1">
                  {item.selectedSize && (
                    <span className="text-xs px-2 py-1 bg-neutral-100 rounded-md">
                      Size: {item.selectedSize}
                    </span>
                  )}
                  {item.selectedColor && (
                    <span className="text-xs px-2 py-1 bg-neutral-100 rounded-md">
                      Color: {item.selectedColor}
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-500 mt-1">
                  Qty: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-xs text-neutral-500">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-neutral-100 rounded-2xl p-6 space-y-3">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-500">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-neutral-500">Delivery Fee</span>
            <span>${order.deliveryFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-neutral-100 pt-2 flex justify-between font-bold text-base">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
