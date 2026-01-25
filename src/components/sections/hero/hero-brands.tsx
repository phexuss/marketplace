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
    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 lg:justify-between lg:gap-x-10">
      {BRANDS_DATA.map((brand) => (
        <Image
          key={brand.src}
          src={brand.src}
          alt={brand.alt}
          width={brand.width}
          height={brand.height}
          className="h-6 md:h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity active:opacity-65"
        />
      ))}
    </div>
  );
};

export default HeroBrands;
