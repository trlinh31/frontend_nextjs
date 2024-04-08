import { getU } from '@/api/customer';
import CustomerForm from '@/app/admin/khach-hang/_components/khach-hang.form';
import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_CUSTOMER } from '@/constants/url';

type PropsType = {
  params: {
    id: string;
  };
};

const breadcrumbItem = { title: 'Sản phẩm', link: URL_SHOW_CUSTOMER, action: 'Cập nhật' };

export default async function ProductUpdate({ params }: PropsType) {
  const customer = await getU(params.id);

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <CustomerForm initCustomer={customer} />
    </>
  );
}
