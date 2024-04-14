import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_GROUP } from '@/constants/url';
import { getAllRoles } from '@/api/role';
import GroupForm from '@/app/admin/group/_components/group.form';

const breadcrumbItem = { title: 'Nhóm tài khoản', link: URL_SHOW_GROUP, action: 'Thêm mới' };

export default async function RoleCreate() {
  const { data } = await getAllRoles();

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <GroupForm roles={data} />
    </>
  );
}
