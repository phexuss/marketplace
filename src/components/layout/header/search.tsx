'use client';

import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import { useId, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function Search() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const searchId = useId();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log('Searching for:', query);
    setOpen(false);
  };

  return (
    <div className="flex flex-1 min-w-0">
      <div className="flex ml-auto md:hidden">
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
            className="fixed inset-x-2 top-4 z-50 h-14 w-[calc(100%-1rem)] max-w-none sm:max-w-none translate-x-0 translate-y-0 rounded-xl border-none bg-background p-0 shadow-lg"
          >
            <DialogTitle className="sr-only">Search</DialogTitle>
            <DialogDescription className="sr-only">
              Search for products in the store
            </DialogDescription>
            <div className="flex h-full w-full items-center gap-2 px-4">
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
          </DialogContent>
        </Dialog>
      </div>
      <search
        onSubmit={handleSearch}
        className="hidden md:flex items-center relative bg-muted rounded-full px-3 w-full h-10 lg:h-11 xl:h-12 xl:px-4"
      >
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
        </form>
      </search>
    </div>
  );
}
