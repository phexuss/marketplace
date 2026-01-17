import { Menu } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function BurgerButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu strokeWidth={2.5} className="size-5.5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-75 sm:w-90 px-5 py-3.5 font-main">
        <SheetTitle className="sr-only">Main Navigation</SheetTitle>

        <nav className="mt-6">
          <ul className="flex flex-col gap-4">
            <li>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="shop" className="border-none">
                  <AccordionTrigger className="py-2 text-lg font-medium hover:no-underline justify-start gap-2">
                    Shop
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="flex flex-col gap-3 pl-4 pt-2 text-muted-foreground border-l ml-1">
                      <li>
                        <Link href="/shop/men">Men's Clothing</Link>
                      </li>
                      <li>
                        <Link href="/shop/women">Women's Clothing</Link>
                      </li>
                      <li>
                        <Link href="/shop/accessories">Accessories</Link>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>

            <li>
              <Link href="/on-sale" className="block text-lg font-medium py-2">
                On Sale
              </Link>
            </li>
            <li>
              <Link
                href="/new-arrivals"
                className="block text-lg font-medium py-2"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/brands" className="block text-lg font-medium py-2">
                Brands
              </Link>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
