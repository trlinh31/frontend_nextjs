import { getRoleDetails } from '@/api/role';
import RoleForm from '@/app/admin/role/_components/role.form';
import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_ROLE } from '@/constants/url';

type PropsType = {
  params: {
    id: string;
  };
};

const breadcrumbItem = { title: 'Vai trò', link: URL_SHOW_ROLE, action: 'Cập nhật' };

export default async function RoleUpdate({ params }: PropsType) {
  const res = await getRoleDetails(params.id);
  const role = res?.data;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <RoleForm initRole={role} />
    </>
  );
}
