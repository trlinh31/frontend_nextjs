import { Product } from '@/types/product.type';
import { decodeToken } from '@/utils/sessionToken';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ICartItem {
  product: Product;
  quantity: number;
}

interface IAuthState {
  roles: string[];
  setRoles: (token: string) => void;
  resetRoles: () => void;
}

interface ICartState {
  items: ICartItem[];
  addItem: (product: Product) => boolean;
  getTotalPrice: () => number;
  removeItem: (id: string) => void;
  removeAllItem: () => void;
}

export const useCartStore = create(
  persist<ICartState>(
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
        return get().items.reduce((total: number, item: ICartItem) => total + item.product.price * item.quantity, 0);
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

export const useAuthStore = create(
  persist<IAuthState>(
    (set) => ({
      roles: [],
      setRoles: (token) => {
        const decodedToken = decodeToken(token);
        if (decodedToken) {
          set({ roles: decodedToken.roles });
        }
      },
      resetRoles: () => {
        set({ roles: [] });
      },
    }),
    {
      name: 'roles',
    }
  )
);
