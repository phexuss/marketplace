import type { Metadata } from 'next';
import { getServerSession } from '@/lib/get-session';
import prisma from '@/lib/prisma';
import DashboardClient from './dashboard-client';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Manage your Shop.co account - view orders, track shipments, and update your profile settings.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session?.user) {
    return null;
  }

  const totalOrders = await prisma.order.count({
    where: {
      userId: session.user.id,
      status: 'PAID',
    },
  });

  const recentOrders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
      status: 'PAID',
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  const serializedOrders = recentOrders.map((order) => ({
    ...order,
    createdAt: order.createdAt.toISOString(),
  }));

  return (
    <DashboardClient
      user={session.user}
      totalOrders={totalOrders}
      recentOrders={serializedOrders}
    />
  );
}
