'use client';

import { ArrowLeft, Search as SearchIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useEffect, useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { SearchPreviewCard } from './search-preview-card';
import { searchProducts } from './search-results';

interface SearchProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  discount: number | null;
  images: string[];
  rating: number;
  brand: string;
}

const SearchResultsList = ({
  products,
  query,
}: {
  products: SearchProduct[];
  query: string;
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-muted-foreground">
        No products found
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2 pr-3 gap-1">
      {products.map((product) => (
        <SearchPreviewCard key={product.id} {...product} />
      ))}
      <Link
        href={`/shop?q=${encodeURIComponent(query)}`}
        className="text-center py-3 text-sm font-medium text-black hover:underline"
      >
        View all results
      </Link>
    </div>
  );
};

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchId = useId();

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchProducts(query.trim());
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const currentParams = qs.parse(searchParams.toString());

    const newQuery = {
      ...currentParams,
      q: query.trim() || null,
    };

    const url = qs.stringifyUrl(
      {
        url: '/shop',
        query: newQuery,
      },
      { skipNull: true, skipEmptyString: true },
    );

    router.push(url);
    setOpen(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSearchResults([]);
    const currentParams = qs.parse(searchParams.toString());
    delete currentParams.q;
    const url = qs.stringifyUrl({ url: '/shop', query: currentParams });
    router.push(url);
  };

  return (
    <div className="flex flex-1 min-w-0 md:justify-center md:max-w-2xl md:mx-auto lg:max-w-3xl xl:max-w-4xl">
      <div className="flex ml-auto xl:hidden">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              aria-label="Open search"
              className="text-foreground/80 transition-colors hover:text-foreground cursor-pointer"
            >
              <SearchIcon strokeWidth={1.75} className="size-5" />
            </button>
          </DialogTrigger>
          <DialogContent
            showCloseButton={false}
            className="fixed left-4 right-4 top-4 z-50 h-fit max-h-[80vh] w-auto max-w-2xl mx-auto translate-x-0 translate-y-0 rounded-xl border-none bg-background p-0 shadow-lg flex flex-col"
          >
            <DialogTitle className="sr-only">Search</DialogTitle>
            <DialogDescription className="sr-only">
              Search for products in the store
            </DialogDescription>
            <div className="flex h-14 w-full items-center gap-2 px-4 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="h-auto w-auto shrink-0 cursor-pointer p-0"
              >
                <ArrowLeft className="size-6 text-gray-600" />
              </Button>
              <form onSubmit={handleSearch} className="flex-1">
                <Input
                  name="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  placeholder="Search for products..."
                  className="h-10 w-full border-none bg-transparent text-base shadow-none focus-visible:ring-0"
                />
              </form>
            </div>

            {query.trim().length >= 2 && (
              <div className="flex flex-col overflow-y-auto px-2 pb-4 gap-1">
                {isSearching ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    Searching...
                  </div>
                ) : (
                  <SearchResultsList products={searchResults} query={query} />
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="hidden xl:flex items-center relative bg-muted rounded-full px-3 w-full h-10 lg:h-11 xl:h-12 xl:px-4 group">
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full h-full gap-2 lg:gap-3"
        >
          <label htmlFor={searchId} className="sr-only">
            Search for products
          </label>
          <SearchIcon
            className="text-muted-foreground size-5 shrink-0 lg:size-5.5 xl:size-6"
            strokeWidth={2}
            aria-hidden="true"
          />
          <Input
            id={searchId}
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full h-full bg-transparent border-none shadow-none focus-visible:ring-0 text-sm placeholder:text-muted-foreground lg:text-base truncate px-0"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="text-muted-foreground hover:text-black cursor-pointer"
            >
              <X className="size-4" />
            </button>
          )}
        </form>

        {query.trim().length >= 2 && (
          <div className="absolute top-full left-0 mt-2 bg-background border rounded-2xl shadow-lg z-50 max-h-[70vh] overflow-y-auto hidden group-focus-within:block w-112.5 md:w-125 lg:w-150">
            {isSearching ? (
              <div className="text-center py-8 text-sm text-muted-foreground">
                Searching...
              </div>
            ) : (
              <SearchResultsList products={searchResults} query={query} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
