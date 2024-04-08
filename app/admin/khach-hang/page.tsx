import BreadCrumb from '@/components/breadcrumb';
import { getAll } from '@/api/customer';
import { URL_SHOW_CUSTOMER } from '@/constants/url';
import CustomerTable from '@/app/admin/khach-hang/_components/khach-hang.table';

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | number;
  };
};

const calcPagesCount = (pageSize: number, totalCount: number) => {
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};

const breadcrumbItem = { title: 'Khách hàng', link: URL_SHOW_CUSTOMER };

export default async function CustomerPage({ searchParams }: paramsProps) {
  const page = searchParams?.page ?? 1;
  const search = searchParams?.q ?? '';
  const LIMIT = Number(process.env.NEXT_PUBLIC_PAGE_SIZE);
  const res = await getAll(page, search);
  const customers = await res.json();
  const totalItems = Number(res.headers?.get('X-Total-Count') ?? 0);
  const totalPage = calcPagesCount(LIMIT, totalItems);

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <div className='mt-10'>
        <CustomerTable customers={customers ? customers : []} pagination={{ currentPage: Number(page), totalPage: totalPage }} />
      </div>
    </>
  );
}
