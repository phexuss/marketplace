'use client';

import { Check, Filter, Settings2, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { memo, useCallback, useEffect, useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';

interface Category {
  id: number;
  name: string;
}
interface Color {
  id: number;
  name: string;
  hex: string;
}
interface Size {
  id: number;
  name: string;
}
interface DressStyle {
  id: number;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
  colors: Color[];
  sizes: Size[];
  styles: DressStyle[];
}

interface FiltersContentProps extends ProductFiltersProps {
  selectedCategories: string[];
  selectedColors: string[];
  selectedSizes: string[];
  selectedStyles: string[];
  priceRange: number[];
  isNewArrival: boolean;
  setPriceRange: (val: number[]) => void;
  setIsNewArrival: (val: boolean) => void;
  toggleFilter: (value: string, list: string[], type: string) => void;
  handleApply: () => void;
  isMobile?: boolean;
}

const ensureArray = (value: unknown): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }
  if (typeof value === 'string') {
    return value.split(',').filter(Boolean);
  }
  return [];
};

const FiltersContent = memo(
  ({
    categories,
    colors,
    sizes,
    styles,
    selectedCategories,
    selectedColors,
    selectedSizes,
    selectedStyles,
    priceRange,
    isNewArrival,
    setPriceRange,
    setIsNewArrival,
    toggleFilter,
    handleApply,
    isMobile = false,
  }: FiltersContentProps) => (
    <div className={`flex flex-col ${isMobile ? 'pb-6' : ''}`}>
      {!isMobile && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold font-main uppercase text-black">
              Filters
            </h3>
            <Settings2 className="size-5 text-neutral-400" />
          </div>
          <Separator className="mb-6" />
        </>
      )}

      <div className="flex flex-col gap-2 pb-6">
        <button
          type="button"
          onClick={() => setIsNewArrival(!isNewArrival)}
          className="flex items-center justify-between w-full py-2 text-neutral-500 hover:text-black transition-colors"
        >
          <span
            className={`text-base transition-all ${isNewArrival ? 'text-black font-bold' : ''}`}
          >
            New Arrivals
          </span>
          <Check
            className={`size-4 transition-opacity ${isNewArrival ? 'opacity-100' : 'opacity-0'}`}
          />
        </button>
        {categories.map((cat) => {
          const isSelected = selectedCategories.includes(cat.name);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() =>
                toggleFilter(cat.name, selectedCategories, 'categories')
              }
              className="flex items-center justify-between w-full py-2 text-neutral-500 hover:text-black transition-colors"
            >
              <span
                className={`text-base transition-all ${isSelected ? 'text-black font-bold' : ''}`}
              >
                {cat.name}
              </span>
              <Check
                className={`size-4 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}
              />
            </button>
          );
        })}
      </div>
      <Separator />

      <Accordion
        type="multiple"
        defaultValue={['price', 'colors', 'sizes', 'style']}
        className="w-full"
      >
        <AccordionItem value="price" className="border-0">
          <AccordionTrigger className="text-xl font-bold py-5 hover:no-underline uppercase text-black">
            Price
          </AccordionTrigger>
          <AccordionContent className="pt-3.5 pb-6 px-2">
            <Slider
              min={0}
              max={200}
              step={2.5}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-center gap-1 mt-4 font-bold text-sm text-black">
              <span>${priceRange[0]}</span> - <span>${priceRange[1]}</span>
            </div>
          </AccordionContent>
          <Separator />
        </AccordionItem>

        <AccordionItem value="colors" className="border-0">
          <AccordionTrigger className="text-xl font-bold py-5 hover:no-underline uppercase text-black">
            Colors
          </AccordionTrigger>
          <AccordionContent className="py-3 px-1.5">
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => {
                const isSelected = selectedColors.includes(color.name);
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() =>
                      toggleFilter(color.name, selectedColors, 'colors')
                    }
                    className={`size-9 rounded-full border-2 transition-all p-0.5 ${isSelected ? 'border-black scale-110' : 'border-neutral-200'}`}
                  >
                    <div
                      className="w-full h-full rounded-full border border-black/5 flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check
                          size={14}
                          className={
                            color.name === 'White' ? 'text-black' : 'text-white'
                          }
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </AccordionContent>
          <Separator />
        </AccordionItem>

        <AccordionItem value="sizes" className="border-0">
          <AccordionTrigger className="text-xl font-bold py-5 hover:no-underline uppercase text-black">
            Size
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const isSelected = selectedSizes.includes(size.name);
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() =>
                      toggleFilter(size.name, selectedSizes, 'sizes')
                    }
                    className={`px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${isSelected ? 'bg-black text-white border-black' : 'bg-neutral-100 border-transparent hover:bg-neutral-200'}`}
                  >
                    {size.name}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
          <Separator />
        </AccordionItem>

        <AccordionItem value="style" className="border-0">
          <AccordionTrigger className="text-xl font-bold py-5 hover:no-underline uppercase text-black">
            Dress Style
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="flex flex-col gap-2">
              {styles.map((style) => {
                const isSelected = selectedStyles.includes(style.name);
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() =>
                      toggleFilter(style.name, selectedStyles, 'styles')
                    }
                    className="flex items-center justify-between w-full py-1 text-neutral-500 hover:text-black transition-colors"
                  >
                    <span className={isSelected ? 'text-black font-bold' : ''}>
                      {style.name}
                    </span>
                    <Check
                      className={`size-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
                    />
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        className="w-full rounded-full font-bold h-12 mt-6 mb-2 cursor-pointer"
        onClick={handleApply}
      >
        Apply Filter
      </Button>
    </div>
  ),
);

FiltersContent.displayName = 'FiltersContent';

export function ProductFilters({
  categories,
  colors,
  sizes,
  styles,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 200]);
  const [isNewArrival, setIsNewArrival] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  useEffect(() => {
    const params = qs.parse(searchParams.toString(), { arrayFormat: 'comma' });
    setSelectedCategories(ensureArray(params.categories));
    setSelectedColors(ensureArray(params.colors));
    setSelectedSizes(ensureArray(params.sizes));
    setSelectedStyles(ensureArray(params.styles));
    setIsNewArrival(params.newArrival === 'true');
    setSearchQuery((params.q as string) || null);

    const min = Number(params.minPrice);
    const max = Number(params.maxPrice);
    if (min || max) setPriceRange([min || 0, max || 200]);
  }, [searchParams]);

  const toggleFilter = useCallback(
    (value: string, list: string[], type: string) => {
      let newList: string[];
      if (type === 'styles') {
        newList = list.includes(value) ? [] : [value];
      } else {
        newList = list.includes(value)
          ? list.filter((i) => i !== value)
          : [...list, value];
      }
      if (type === 'categories') setSelectedCategories(newList);
      if (type === 'colors') setSelectedColors(newList);
      if (type === 'sizes') setSelectedSizes(newList);
      if (type === 'styles') setSelectedStyles(newList);
    },
    [],
  );

  const handleApply = () => {
    const query = {
      q: searchQuery,
      categories: selectedCategories.length
        ? selectedCategories.join(',')
        : null,
      colors: selectedColors.length ? selectedColors.join(',') : null,
      sizes: selectedSizes.length ? selectedSizes.join(',') : null,
      styles: selectedStyles.length ? selectedStyles.join(',') : null,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      newArrival: isNewArrival ? 'true' : null,
    };

    router.push(
      qs.stringifyUrl(
        { url: window.location.pathname, query },
        { skipNull: true, skipEmptyString: true },
      ),
    );
  };

  const sharedProps = {
    categories,
    colors,
    sizes,
    styles,
    selectedCategories,
    selectedColors,
    selectedSizes,
    selectedStyles,
    priceRange,
    isNewArrival,
    setPriceRange,
    setIsNewArrival,
    toggleFilter,
    handleApply,
  };

  return (
    <>
      <div className="xl:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="size-11 bg-neutral-100 rounded-full"
            >
              <span className="sr-only">Open filters</span>
              <Filter className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-fit max-h-[92vh] rounded-t-[32px] px-6 pb-6 outline-none [&>button]:hidden"
          >
            <div className="flex flex-col pt-6">
              <div className="flex items-center justify-between pb-4">
                <SheetTitle className="text-2xl font-bold font-main uppercase text-black">
                  Filters
                </SheetTitle>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(window.location.pathname)}
                    className="text-neutral-400 font-bold hover:text-black h-auto p-0"
                  >
                    Clear All
                  </Button>
                  <SheetClose className="size-8.5 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 active:scale-95 transition-all shadow-sm">
                    <X className="size-4.5 text-black stroke-[3px]" />
                  </SheetClose>
                </div>
              </div>
              <Separator />
              <div className="overflow-y-auto max-h-[65vh] mt-4 pr-1">
                <FiltersContent {...sharedProps} isMobile />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden xl:block w-full border rounded-4xl p-6 h-fit sticky top-24 shadow-sm">
        <FiltersContent {...sharedProps} />
      </div>
    </>
  );
}
