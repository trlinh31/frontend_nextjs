import { getAllCategoryParents, getDetailCategory } from '@/api/category';
import { getAllGroups } from '@/api/group';
import { getUserDetails } from '@/api/user';
import CategoryForm from '@/app/admin/category/_components/category.form';
import UserForm from '@/app/admin/user/_components/user.form';
import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_CATEGORY, URL_SHOW_USER } from '@/constants/url';

type PropsType = {
  params: {
    id: string;
  };
};

const breadcrumbItem = { title: 'Tài khoản', link: URL_SHOW_USER, action: 'Cập nhật' };

export default async function UserEdit({ params }: PropsType) {
  const { data } = await getAllGroups();
  const user = await getUserDetails(params.id);

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <UserForm initUser={user.data} groups={data} />
    </>
  );
}
