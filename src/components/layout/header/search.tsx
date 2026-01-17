'use client';

import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export default function Search() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    console.log('Searching for:', query);
    setOpen(false);
  };

  return (
    <div className="flex-1 min-w-0 flex">
      <div className="md:hidden flex ml-auto">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button type="button" className="p-2 outline-none cursor-pointer">
              <SearchIcon strokeWidth={1.75} className="size-6" />
            </button>
          </DialogTrigger>
          <DialogContent
            showCloseButton={false}
            className="fixed inset-x-0 top-0 z-50 h-17.5 w-full max-w-none sm:max-w-none translate-x-0 translate-y-0 rounded-none border-none bg-white p-0 shadow-none"
          >
            <DialogTitle className="sr-only">Search</DialogTitle>
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

      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center relative bg-[#F0F0F0] rounded-full px-4 w-full h-12 max-w-144.25"
      >
        <SearchIcon className="text-gray-400 size-5 shrink-0" strokeWidth={2} />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full h-full bg-transparent border-none shadow-none focus-visible:ring-0 text-base placeholder:text-gray-500"
        />
      </form>
    </div>
  );
}
