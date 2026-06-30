'use client';
import { motion } from 'motion/react';
import Image from 'next/image';

const BRANDS_DATA = [
  { src: '/brands/versace.svg', alt: 'Versace', width: 166, height: 33 },
  { src: '/brands/zara.svg', alt: 'Zara', width: 91, height: 38 },
  { src: '/brands/gucci.svg', alt: 'Gucci', width: 156, height: 36 },
  { src: '/brands/prada.svg', alt: 'Prada', width: 194, height: 32 },
  {
    src: '/brands/calvinklein.svg',
    alt: 'Calvin Klein',
    width: 206,
    height: 33,
  },
];

const HeroBrands = () => {
  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
      >
        <div className="flex w-max items-center whitespace-nowrap gap-12 pr-12 md:gap-24 md:pr-24 lg:gap-48 lg:pr-48">
          {BRANDS_DATA.map((brand, i) => (
            <Image
              key={`${brand.alt}-${i}-1`}
              src={brand.src}
              alt={brand.alt}
              width={brand.width}
              height={brand.height}
              className="h-6 w-auto shrink-0 cursor-pointer transition-opacity hover:opacity-80 active:opacity-65 md:h-8"
            />
          ))}
        </div>

        <div className="flex w-max items-center whitespace-nowrap gap-12 pr-12 md:gap-24 md:pr-24 lg:gap-48 lg:pr-48">
          {BRANDS_DATA.map((brand, i) => (
            <Image
              key={`${brand.alt}-${i}-2`}
              src={brand.src}
              alt={brand.alt}
              width={brand.width}
              height={brand.height}
              className="h-6 w-auto shrink-0 cursor-pointer transition-opacity hover:opacity-80 active:opacity-65 md:h-8"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBrands;
