import { create } from 'zustand';

interface ProductItems {
  product: {
    id: string;
  };
  quantity: number;
  total: number;
}

interface ProductState {
  productStore: ProductItems[];
  setProductStore: (product: ProductItems) => void;
  updateProductStore: (rowIndex: number, product: ProductItems) => void;
  removeItem: (index: number) => void;
  removeAllItem: () => void;
  calcTotalPrice: () => number;
}

export const useProductStore = create<ProductState>((set, get) => ({
  productStore: [],
  setProductStore: (product) => {
    const existingIndex = get().productStore.findIndex((item) => item.product.id === product.product.id);
    if (existingIndex !== -1) {
      const updatedProducts = [...get().productStore];
      updatedProducts[existingIndex] = product;
      set({ productStore: updatedProducts });
    } else {
      set({ productStore: [...get().productStore, product] });
    }
  },
  updateProductStore: (rowIndex, product) => {
    const updatedProducts = [...get().productStore];
    updatedProducts[rowIndex] = product;
    set({ productStore: updatedProducts });
  },
  removeItem: (index) => {
    const updatedProducts = [...get().productStore];
    updatedProducts.splice(index, 1);
    set({ productStore: updatedProducts });
  },
  removeAllItem: () => set({ productStore: [] }),
  calcTotalPrice: () => {
    return get().productStore.reduce((total, item) => total + item.total, 0);
  },
}));

interface ProductId {
  idStore: string[];
  setIdStore: (id: string) => void;
  removeIdStore: (index: number) => void;
}

export const useProductId = create<ProductId>((set, get) => ({
  idStore: [],
  setIdStore: (id: string) => {
    set({ idStore: [...get().idStore, id] });
  },
  removeIdStore: (index) => {
    const updatedIdStore = [...get().idStore];
    updatedIdStore.splice(index, 1);
    set({ idStore: updatedIdStore });
  },
}));
