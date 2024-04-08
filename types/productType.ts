import { Category } from '@/types/categoryType';

export type ProductImagesType = {
  id: number;
  name: string;
};

export type Product = {
  id: string;
  code: string;
  name: string;
  images: ProductImagesType[];
  description: string;
  importPrice: number;
  price: number;
  quantity: number;
  categories: Category[];
  enable: boolean;
};
