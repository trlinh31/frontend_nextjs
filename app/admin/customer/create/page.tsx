import CustomerForm from '@/app/admin/customer/_components/customer.form';
import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_CUSTOMER } from '@/constants/url';

const breadcrumbItem = { title: 'Khách hàng', link: URL_SHOW_CUSTOMER, action: 'Thêm mới' };

export default function CustomerCreate() {
  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <CustomerForm />
    </>
  );
}
