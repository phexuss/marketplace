import ProductList from '@/components/products/product-list';
import Hero from '@/components/sections/hero';

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="flex justify-center pt-12.5">
        <h2 className="text-[2rem] md:text-5xl uppercase font-bold font-display">
          new arrivals
        </h2>
      </div>
      <ProductList />
    </div>
  );
}
