import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_CATEGORY } from '@/constants/url';
import { Category } from '@/types/categoryType';
import UserForm from '@/app/admin/tai-khoan/_components/tai-khoan.form';

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
