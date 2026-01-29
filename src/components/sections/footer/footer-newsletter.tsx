import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FooterNewsletter = () => {
  return (
    <section className="w-full bg-black rounded-4xl py-9 px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 mb-8 xl:mb-12.5">
      <h2 className="text-white text-[32px] sm:text-4xl lg:text-[40px] leading-tight font-black uppercase text-left max-w-full lg:max-w-137.5">
        Stay upto date about our latest offers
      </h2>

      <div className="flex flex-col gap-3.5 w-full sm:max-w-100 lg:w-87.5 shrink-0">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 size-5" />
          <Input
            type="email"
            placeholder="Enter your email address"
            className="bg-white  font-main rounded-full pl-12 h-12 text-black border-none focus-visible:ring-0 placeholder:text-black/40"
          />
        </div>
        <Button className="w-full bg-white text-black hover:bg-neutral-200 rounded-full h-12 font-bold transition-all cursor-pointer">
          Subscribe to Newsletter
        </Button>
      </div>
    </section>
  );
};
export default FooterNewsletter;
