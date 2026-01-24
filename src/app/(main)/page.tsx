import Link from 'next/link';
import ProductList from '@/components/products/product-list';
import Hero from '@/components/sections/hero';

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductList />
    </div>
  );
}
