import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_CATEGORY } from '@/constants/url';
import { Category } from '@/types/category.type';
import UserForm from '@/app/admin/user/_components/user.form';

type CategoryPropType = {
  parentsCategory: Category[] | [];
};

const breadcrumbItem = { title: 'Tài khoản', link: URL_SHOW_CATEGORY, action: 'Thêm mới' };

export default async function UserCreate() {
  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <UserForm />
    </>
  );
}
