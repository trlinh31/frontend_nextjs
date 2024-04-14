import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_ROLE } from '@/constants/url';
import RoleTable from '@/app/admin/role/_components/role.table';
import { getAllRoles } from '@/api/role';
import { Role } from '@/types/role.type';

const breadcrumbItem = { title: 'Vai trò', link: URL_SHOW_ROLE };

export default async function RolePage() {
  let roles: Role[] = [];
  const { data } = await getAllRoles();
  roles = data;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <div className='mt-10'>
        <RoleTable roles={roles} />
      </div>
    </>
  );
}
