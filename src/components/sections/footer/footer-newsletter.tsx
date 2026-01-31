'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { subscribeAction } from '@/lib/newsletter';
import { type NewsletterInput, NewsletterSchema } from '@/schemas/newsletter';
import { useNewsletterStore } from '@/store/newsletter-store';

const FooterNewsletter = () => {
  const { isSubscribed, setSubscribed } = useNewsletterStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewsletterInput>({
    resolver: zodResolver(NewsletterSchema),
  });

  const onSubmit = async (data: NewsletterInput) => {
    const result = await subscribeAction(data);

    if (result.success) {
      setSubscribed(true);
      toast.success('Nice! Check your inbox.');
    } else {
      toast.error(result.error || 'Something went wrong');
    }
  };

  if (!mounted) return null;

  return (
    <section className="w-full bg-black rounded-4xl py-9 px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 mb-8 xl:mb-12.5">
      <h2 className="text-white text-[32px] sm:text-4xl lg:text-[40px] leading-tight font-black uppercase text-left max-w-full lg:max-w-137.5">
        {isSubscribed
          ? 'You are officially in the club!'
          : 'Stay upto date about our latest offers'}
      </h2>

      {!isSubscribed ? (
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3.5 w-full sm:max-w-100 lg:w-87.5 shrink-0"
        >
          <div className="flex flex-col gap-1 w-full">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 size-5" />
              <Input
                {...register('email')}
                type="email"
                placeholder="Enter your email address"
                className="bg-white font-main rounded-full pl-12 h-12 text-black border-none focus-visible:ring-0 placeholder:text-black/40"
              />
            </div>
            {errors.email && (
              <p className="pl-4 text-[10px] sm:text-xs font-main text-red-500 animate-in fade-in slide-in-from-top-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black hover:bg-neutral-200 rounded-full h-12 font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Subscribe to Newsletter'}
          </Button>
        </form>
      ) : (
        <div className="flex items-center justify-center lg:w-87.5 animate-in fade-in zoom-in duration-500">
          <p className="text-white font-bold text-xl  uppercase tracking-widest">
            Thanks for subscribing!
          </p>
        </div>
      )}
    </section>
  );
};

export default FooterNewsletter;
