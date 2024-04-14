import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_PRODUCT } from '@/constants/url';
import FeedbackTable from '@/app/admin/feedback/_components/feedback.table';

type paramsProps = {
  searchParams: {
    [key: string]: string | number;
  };
};

const breadcrumbItem = { title: 'Sản phẩm', link: URL_SHOW_PRODUCT };

export default async function ProductPage({ searchParams }: paramsProps) {
  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <div className='mt-10'>
        <FeedbackTable />
      </div>
    </>
  );
}
