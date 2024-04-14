import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_PRODUCT } from '@/constants/url';
import UserTable from '@/app/admin/user/_components/user.table';

type paramsProps = {
  searchParams: {
    [key: string]: string | number;
  };
};

const breadcrumbItem = { title: 'Tài khoản', link: URL_SHOW_PRODUCT };

export default async function ProductPage({ searchParams }: paramsProps) {
  // let products: Product[] = [];
  // let totalPage = 0;
  // const page = searchParams?.page ?? 0;
  // const res = await getAllProduct(page);

  // if (res && res.ok) {
  //   try {
  //     const data = await res.json();

  //     if (data && data.content && data.totalPages) {
  //       products = [...data.content.filter((item: Product) => item.enable)];
  //       totalPage = data.totalPages;
  //     } else {
  //       console.error('Invalid response data format');
  //     }
  //   } catch (error) {
  //     console.error('Error parsing JSON:', error);
  //   }
  // } else {
  //   console.error('Failed to fetch data');
  // }

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <div className='mt-10'>
        <UserTable />
      </div>
    </>
  );
}
