import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_ROLE } from '@/constants/url';
import GroupTable from '@/app/admin/group/_components/group.table';
import { Group } from '@/types/group.type';
import { getAllGroups } from '@/api/group';

const breadcrumbItem = { title: 'Nhóm tài khoản', link: URL_SHOW_ROLE };

export default async function GroupPage() {
  let groups: Group[] = [];
  const { data } = await getAllGroups();
  groups = data;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <div className='mt-10'>
        <GroupTable groups={groups} />
      </div>
    </>
  );
}
