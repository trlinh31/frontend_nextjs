import { getCustomerDetails } from '@/api/customer';
import CustomerForm from '@/app/admin/customer/_components/customer.form';
import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_CUSTOMER } from '@/constants/url';

type PropsType = {
  params: {
    id: string;
  };
};

const breadcrumbItem = { title: 'Khách hàng', link: URL_SHOW_CUSTOMER, action: 'Cập nhật' };

export default async function CustomerUpdate({ params }: PropsType) {
  const res = await getCustomerDetails(params.id);
  const customer = res?.data;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <CustomerForm initCustomer={customer} />
    </>
  );
}
