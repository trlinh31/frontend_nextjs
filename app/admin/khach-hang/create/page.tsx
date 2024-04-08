import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_USER } from '@/constants/url';
import UserForm from '@/app/admin/khach-hang/_components/khach-hang.form';

const breadcrumbItem = { title: 'Khách hàng', link: URL_SHOW_USER, action: 'Thêm mới' };

export default function UserCreate() {
  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <UserForm />
    </>
  );
}
