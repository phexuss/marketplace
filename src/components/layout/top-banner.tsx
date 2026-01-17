import Link from 'next/link';

const TopBanner = () => {
  return (
    <div className="flex w-full flex-row justify-center gap-2 text-xs bg-black text-white py-2.25 font-main md:text-sm">
      <p>Sign up and get 20% off to your first order.</p>
      <Link href={'/'} className="underline underline-offset-4 decoration-1">
        Sign Up Now
      </Link>
    </div>
  );
};

export default TopBanner;
