import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-[#e3e7eb] overflow-hidden">
      <div className="flex flex-col px-4 pt-10 items-center gap-5 lg:flex-row lg:px-16 lg:pt-0">
        <div className="flex flex-col items-center md:items-start text-center md:text-left lg:flex-1 lg:py-20">
          <h1 className="text-4xl md:text-6xl font-extrabold font-display leading-tight">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-[#616060] font-normal text-sm md:text-base mt-2 max-w-sm md:max-w-md">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <Button
            variant="default"
            className="text-base rounded-full py-6 px-14 mt-6 w-full sm:w-max hover:bg-neutral-800 active:bg-neutral-700 transition-colors cursor-pointer"
          >
            Shop Now
          </Button>
          {/* обернуть в линк позже*/}

          <div className="mt-10 grid grid-cols-2 justify-center gap-y-3 md:flex md:flex-wrap md:justify-start md:gap-x-12">
            <div className="relative flex flex-col pr-8">
              <span className="text-2xl md:text-3xl lg:text-[2.5rem] font-bold">
                200+
              </span>
              <span className="text-[#616060] text-xs lg:text-base">
                International Brands
              </span>
              <div className="absolute right-0 top-0 h-full w-px bg-black/10 md:hidden" />
            </div>

            <div className="flex flex-col pl-8 md:pl-0 md:relative md:pr-12">
              <span className="text-2xl md:text-3xl font-bold lg:text-[2.5rem]">
                2,000+
              </span>
              <span className="text-[#616060] text-xs lg:text-base">
                High-Quality Products
              </span>
              <div className="hidden absolute right-0 top-0 h-full w-px bg-black/10 md:block" />
            </div>

            <div className="col-span-2 flex flex-col items-center pt-3 md:col-span-1 md:items-start md:pt-0">
              <span className="text-2xl md:text-3xl font-bold lg:text-[2.5rem]">
                30,000+
              </span>
              <span className="text-[#616060] text-xs lg:text-base">
                Happy Customers
              </span>
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
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 lg:justify-between lg:gap-x-10">
            <Image
              src="/brands/versace.svg"
              alt="Versace"
              width={166}
              height={33}
              className="h-6 md:h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity active:opacity-65"
            />

            <Image
              src="/brands/zara.svg"
              alt="Zara"
              width={91}
              height={38}
              className="h-6 md:h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity active:opacity-65"
            />

            <Image
              src="/brands/gucci.svg"
              alt="Gucci"
              width={156}
              height={36}
              className="h-6 md:h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity active:opacity-65"
            />

            <Image
              src="/brands/prada.svg"
              alt="Prada"
              width={194}
              height={32}
              className="h-6 md:h-8 w-auto  max-w-25 md:max-w-none cursor-pointer hover:opacity-80 transition-opacity active:opacity-65"
            />

            <Image
              src="/brands/calvinklein.svg"
              alt="Calvin Klein"
              width={206}
              height={33}
              className="h-6 md:h-8 w-auto  max-w-30 md:max-w-none cursor-pointer hover:opacity-80 transition-opacity active:opacity-65"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
