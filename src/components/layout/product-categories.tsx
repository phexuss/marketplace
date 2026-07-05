import Image from 'next/image';
import Link from 'next/link';

const CATEGORIES = [
  {
    name: 'Casual',
    href: '/shop?styles=Casual',
    image: '/categories/casual.jpg',
  },
  {
    name: 'Formal',
    href: '/shop?styles=Formal',
    image: '/categories/formal.jpg',
  },
  {
    name: 'Party',
    href: '/shop?styles=Party',
    image: '/categories/party.jpg',
  },
  { name: 'Gym', href: '/shop?styles=Gym', image: '/categories/gym.jpg' },
];

const ProductCategories = () => {
  return (
    <section className="flex flex-col px-4 md:px-16 text-center justify-center items-center bg-category-bg pt-10 pb-7 md:py-16 rounded-[1.75rem] md:rounded-[2.5rem]">
      <h2 className="uppercase text-[2rem] md:text-5xl font-bold font-display max-w-[16rem] md:max-w-none mb-8 md:mb-12">
        browse by dress style
      </h2>

      <nav className="w-full max-w-250 flex flex-col gap-4 md:gap-5">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-5">
          {CATEGORIES.slice(0, 2).map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="relative flex h-47.5 md:h-55 w-full overflow-hidden rounded-2xl bg-white group"
            >
              <span className="absolute top-4 left-6 z-10 text-2xl md:text-3xl font-bold text-black">
                {category.name}
              </span>
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 md:gap-5">
          {CATEGORIES.slice(2, 4).map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="relative flex h-47.5 md:h-55 w-full overflow-hidden rounded-2xl bg-white group"
            >
              <span className="absolute top-4 left-6 z-10 text-2xl md:text-3xl font-bold text-black">
                {category.name}
              </span>
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </section>
  );
};

export default ProductCategories;
