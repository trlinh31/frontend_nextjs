import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_CATEGORY } from '@/constants/url';
import RoleForm from '@/app/admin/role/_components/role.form';

const breadcrumbItem = { title: 'Vai trò', link: URL_SHOW_CATEGORY, action: 'Thêm mới' };

export default async function RoleCreate() {
  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <RoleForm />
    </>
  );
}
