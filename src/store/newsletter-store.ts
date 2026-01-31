import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NewsletterState {
  isSubscribed: boolean;
  setSubscribed: (value: boolean) => void;
}

export const useNewsletterStore = create<NewsletterState>()(
  persist(
    (set) => ({
      isSubscribed: false,
      setSubscribed: (value) => set({ isSubscribed: value }),
    }),
    {
      name: 'newsletter-storage',
    },
  ),
);
