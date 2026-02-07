import ProfileForm from '@/components/profile/profile-form';

interface User {
  name: string;
  email: string;
  createdAt: Date;
  emailVerified?: boolean;
  role?: string | null;
}

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  selectedColor: string | null;
  selectedSize: string | null;
  product: {
    id: number;
    name: string;
    images: string[];
  };
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function DashboardClient({
  user,
  totalOrders,
  recentOrders,
}: {
  user: User;
  totalOrders: number;
  recentOrders: Order[];
}) {
  return (
    <ProfileForm
      user={user}
      totalOrders={totalOrders}
      recentOrders={recentOrders}
    />
  );
}
