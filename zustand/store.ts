import { Product } from '@/types/product.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => boolean;
  getTotalPrice: () => number;
  removeItem: (id: string) => void;
  removeAllItem: () => void;
}

export const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const itemExists = get().items.find((item) => item.product.id === product.id);
        if (itemExists) {
          if (typeof itemExists.quantity === 'number') {
            if (itemExists.quantity <= product.quantity - 1) {
              itemExists.quantity++;
            } else {
              return false;
            }
          }
          set({ items: [...get().items] });
          return true;
        } else {
          set({ items: [...get().items, { product, quantity: 1 }] });
          return true;
        }
      },
      removeItem: (id: string) => {
        const updateItem = get().items.filter((item) => item.product.id !== id);
        set({ items: [...updateItem] });
      },
      getTotalPrice: () => {
        return get().items.reduce((total: number, item: CartItem) => total + item.product.price * item.quantity, 0);
      },
      removeAllItem: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cartItems',
    }
  )
);
