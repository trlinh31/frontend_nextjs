import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_USER } from '@/constants/url';
import UserForm from '@/app/admin/user/_components/user.form';
import { getAllGroups } from '@/api/group';

const breadcrumbItem = { title: 'Tài khoản', link: URL_SHOW_USER, action: 'Thêm mới' };

export default async function UserCreate() {
  const { data } = await getAllGroups();
  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <UserForm groups={data} />
    </>
  );
}
