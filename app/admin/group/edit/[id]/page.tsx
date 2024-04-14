import { getGroupDetails } from '@/api/group';
import { getAllRoles } from '@/api/role';
import GroupForm from '@/app/admin/group/_components/group.form';
import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_GROUP } from '@/constants/url';

type PropsType = {
  params: {
    id: string;
  };
};

const breadcrumbItem = { title: 'Nhóm tài khoản', link: URL_SHOW_GROUP, action: 'Cập nhật' };

export default async function RoleUpdate({ params }: PropsType) {
  const res = await getGroupDetails(params.id);
  const group = res?.data;

  const { data } = await getAllRoles();

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <GroupForm initGroup={group} roles={data} />
    </>
  );
}
