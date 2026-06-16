import FooterBottom from './footer-bottom';
import FooterNewsletter from './footer-newsletter';

export default function Footer() {
  return (
    <footer className="relative mt-52.5 bg-[#F0F0F0] pt-45 lg:pt-35 pb-6 md:pb-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full  px-4 xl:px-25 z-15">
        <FooterNewsletter />
      </div>

      <div className="container mx-auto px-4 xl:px-25">
        <FooterBottom />
      </div>
    </footer>
  );
}
