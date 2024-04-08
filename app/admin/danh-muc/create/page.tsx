import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_CATEGORY } from '@/constants/url';
import CategoryForm from '@/app/admin/danh-muc/_components/danh-muc.form';
import { Category } from '@/types/categoryType';
import { getAllCategory, getAllCategoryParents } from '@/api/category';

type CategoryPropType = {
  parentsCategory: Category[] | [];
};

const breadcrumbItem = { title: 'Danh mục sản phẩm', link: URL_SHOW_CATEGORY, action: 'Thêm mới' };

export default async function CategoryCreate() {
  const res = await getAllCategoryParents();
  const parentCategory = res.filter((item: Category) => item.enable);

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <CategoryForm parentsCategory={parentCategory} />
    </>
  );
}
