import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

const FOOTER_DATA = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Features', href: '#' },
      { label: 'Works', href: '#' },
      { label: 'Career', href: '#' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Customer Support', href: '#' },
      { label: 'Delivery Details', href: '#' },
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
  {
    title: 'FAQ',
    links: [
      { label: 'Account', href: '/dashboard' },
      { label: 'Manage Deliveries', href: '#' },
      { label: 'Orders', href: '#' },
      { label: 'Payments', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Free eBook', href: '#' },
      { label: 'Development Tutorial', href: '#' },
      { label: 'How to - Blog', href: '#' },
      { label: 'Youtube Playlist', href: '#' },
    ],
  },
];

const SOCIALS_DATA = [
  { label: 'Twitter', file: 'twitter.svg' },
  { label: 'Facebook', file: 'facebook.svg' },
  { label: 'Instagram', file: 'instagram.svg' },
  { label: 'Github', file: 'github.svg' },
];

const FooterBottom = () => {
  const paymentMethods = [
    { label: 'Visa', file: 'Visa.svg' },
    { label: 'Mastercard', file: 'Mastercard.svg' },
    { label: 'PayPal', file: 'PayPal.svg' },
    { label: 'Apple Pay', file: 'ApplePay.svg' },
    { label: 'Google Pay', file: 'GooglePay.svg' },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 pb-12">
        <div className="max-w-62">
          <h3 className="text-[1.8rem] md:text-[2rem] font-black uppercase mb-6 font-main text-black">
            Shop.co
          </h3>
          <p className="text-black/60 text-sm leading-5.5 mb-9">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="flex gap-3">
            {SOCIALS_DATA.map((social) => (
              <Link
                key={social.label}
                href="https://github.com/phexuss"
                target="_blank"
                className="relative size-7 flex items-center justify-center rounded-full border border-black/10 bg-white hover:bg-amber-50/50 transition-all overflow-hidden"
              >
                <Image
                  src={`/socials/${social.file}`}
                  alt={social.label}
                  fill
                  className="object-contain p-1.5"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 lg:gap-x-20">
          {FOOTER_DATA.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold uppercase tracking-[3px] text-black mb-6 text-[0.875rem] md:text-[1rem]">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-black/60 hover:text-black text-sm md:text-base transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <Separator className="bg-black/10 h-px" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 md:py-8">
          <p className="text-black/60 text-sm font-normal text-center md:text-left flex flex-col">
            Shop.co © 2000-2026, All Rights Reserved
            <span>
              Developed by{' '}
              <Link
                href="https://github.com/phexuss"
                className="hover:underline underline-offset-3 hover:text-black transition-normal duration-200"
                target="_blank"
              >
                phexuss
              </Link>
            </span>
          </p>

          <div className="flex items-center gap-3">
            {paymentMethods.map((method) => (
              <div
                key={method.label}
                className="relative w-11.5 h-7.5 bg-white rounded-[5px] border border-[#D6D6D6] flex items-center justify-center overflow-hidden"
              >
                <Image
                  src={`/payment-methods/${method.file}`}
                  alt={method.label}
                  fill
                  className="object-contain p-1.25"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;
