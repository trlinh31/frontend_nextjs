import { Product } from '@/types/product.type';

type StockDetail = {
  id: string;
  importPrice: number;
  total: number;
  product: Product;
  quantity: number;
};

export type Stock = {
  id: string;
  code: string;
  billInvoice: number;
  stockInDetails: StockDetail[];
  createdDate: string;
};
