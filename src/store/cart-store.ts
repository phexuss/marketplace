import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  cartItemId: string;
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, amount: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.cartItemId === newItem.cartItemId,
          );
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === newItem.cartItemId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }
          return { items: [...state.items, newItem] };
        }),
      removeItem: (cartItemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        })),
      updateQuantity: (cartItemId, amount) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.cartItemId === cartItemId
              ? { ...i, quantity: Math.max(1, i.quantity + amount) }
              : i,
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: 'cart-storage' },
  ),
);
