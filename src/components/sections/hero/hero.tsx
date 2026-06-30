import Image from 'next/image';
import HeroDescription from '@/components/motion/hero/HeroDescription';
import HeroLabel from '@/components/motion/hero/HeroLabel';
import ShopNowButton from '@/components/motion/hero/ShopNowButton';
import {
  BrandsSpan,
  CustomersSpan,
  ProductsSpan,
} from '@/components/motion/hero/StatsSpans';
import HeroBrands from '@/components/sections/hero/hero-brands';

const Hero = () => {
  return (
    <section className="bg-hero-bg overflow-hidden">
      <div className="flex flex-col px-4 pt-10 items-center gap-5 lg:flex-row lg:px-16 lg:pt-0">
        <div className="flex flex-col items-center md:items-start text-center md:text-left lg:flex-1 lg:py-20">
          <HeroLabel />
          <HeroDescription />
          <ShopNowButton />

          <div className="mt-10 grid grid-cols-2 justify-center gap-y-3 md:flex md:flex-wrap md:justify-start md:gap-x-12">
            <div className="relative flex flex-col pr-8">
              <BrandsSpan />
              <div className="absolute right-0 top-0 h-full w-px bg-black/10 md:hidden" />
            </div>

            <div className="flex flex-col pl-8 md:pl-0 md:relative md:pr-12">
              <ProductsSpan />
              <div className="hidden absolute right-0 top-0 h-full w-px bg-black/10 md:block" />
            </div>

            <div className="col-span-2 flex flex-col items-center pt-3 md:col-span-1 md:items-start md:pt-0">
              <CustomersSpan />
            </div>
          </div>
        </div>

        <div className="w-full lg:flex-1 lg:self-end">
          <Image
            src="/hero.png"
            alt="Models wearing stylish clothes"
            width={1000}
            height={1000}
            priority
            className="w-full h-auto lg:ml-auto lg:w-auto lg:max-h-150 xl:max-h-none "
          />
        </div>
      </div>
      <div className="w-full bg-black py-10 md:py-11 -mt-px lg:mt-0">
        <div className="max-w-360 mx-auto px-4 md:px-16">
          <HeroBrands />
        </div>
      </div>
    </section>
  );
};

export default Hero;
