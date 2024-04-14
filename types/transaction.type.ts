import { Customer } from '@/types/customer.type';
import { Product } from '@/types/product.type';

export type transactionDetails = {
  id: string;
  total: number;
  quantity: number;
  product: Product;
};

export type Transaction = {
  id: string;
  code: string;
  customer: Customer;
  name: string;
  address: string;
  email: string;
  status: number;
  enable: boolean;
  note: string;
  transactionDetails: transactionDetails[];
  billInvoice: number;
};
