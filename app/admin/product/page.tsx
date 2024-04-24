import ProductTable from '@/app/admin/product/_components/product.table';
import BreadCrumb from '@/components/breadcrumb';
import { getAllProducts } from '@/api/product';
import { URL_SHOW_PRODUCT } from '@/constants/url';
import { Product } from '@/types/product.type';

type paramsProps = {
  searchParams: {
    [key: string]: string | number;
  };
};

const breadcrumbItem = { title: 'Sản phẩm', link: URL_SHOW_PRODUCT };

export default async function ProductPage({ searchParams }: paramsProps) {
  let products: Product[] = [];
  let totalPage = 0;
  const { keyword = '', page = 0 } = searchParams;
  const { data, totalPages } = await getAllProducts(keyword.toString(), +page);
  products = data && [...data.filter((item: Product) => item.enable)];
  totalPage = totalPages;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <div className='mt-10'>
        <ProductTable products={products} pagination={{ currentPage: +page, totalPage: totalPage }} />
      </div>
    </>
  );
}
