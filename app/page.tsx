import { getAllProducts } from '@/api/product';
import Header from '@/app/(client)/_component/layouts/header';
import ProductList from '@/components/product-list';
import { Product } from '@/types/product.type';

type paramsProps = {
  searchParams: {
    [key: string]: number;
  };
};

export default async function Home({ searchParams }: paramsProps) {
  let products: Product[] = [];
  let totalPage = 0;
  const page = searchParams?.page ?? 0;
  const { data, totalPages } = await getAllProducts(page);
  products = data && [...data.filter((item: Product) => item.enable)];
  totalPage = totalPages;

  return (
    <>
      <Header />
      <main className='py-20'>
        <ProductList products={data} pagination={{ currentPage: Number(page), totalPage: totalPage }} />
      </main>
    </>
  );
}
