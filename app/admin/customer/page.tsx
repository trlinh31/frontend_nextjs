import ProductTable from '@/app/admin/product/_components/product.table';
import BreadCrumb from '@/components/breadcrumb';
import { getAllProducts } from '@/api/product';
import { URL_SHOW_PRODUCT } from '@/constants/url';
import { Product } from '@/types/product.type';
import CustomerTable from '@/app/admin/customer/_components/customer.table';
import { Customer } from '@/types/customer.type';
import { getAllCustomers } from '@/api/customer';

type paramsProps = {
  searchParams: {
    [key: string]: number;
  };
};

const breadcrumbItem = { title: 'Khách hàng', link: URL_SHOW_PRODUCT };

export default async function ProductPage({ searchParams }: paramsProps) {
  let customers: Customer[] = [];
  let totalPage = 0;
  const page = searchParams?.page ?? 0;
  const { data, totalPages } = await getAllCustomers(page);
  customers = data && [...data.filter((item: Customer) => item.enable)];
  totalPage = totalPages;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <div className='mt-10'>
        <CustomerTable customers={customers} pagination={{ currentPage: Number(page), totalPage: totalPage }} />
      </div>
    </>
  );
}
