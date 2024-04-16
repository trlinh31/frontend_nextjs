'use client';
import PaginationSection from '@/components/pagination';
import ProductItem from '@/components/product';
import { Product } from '@/types/product.type';

type propType = {
  products: Product[] | [];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
};

export default function ProductList({ products, pagination }: propType) {
  const { currentPage, totalPage } = pagination;

  return (
    <div className='container max-w-[1366px]'>
      <div className='grid grid-cols-4 gap-8'>{products && products.map((product) => <ProductItem key={product.id} product={product} />)}</div>
      <PaginationSection totalPage={totalPage} currentPage={currentPage} />
    </div>
  );
}
