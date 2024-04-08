import { getAllCategory, getAllCategoryParents, getDetailCategory } from '@/api/category';
import CategoryForm from '@/app/admin/danh-muc/_components/danh-muc.form';
import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_CATEGORY } from '@/constants/url';

type PropsType = {
  params: {
    id: string;
  };
};

const breadcrumbItem = { title: 'Danh mục sản phẩm', link: URL_SHOW_CATEGORY, action: 'Cập nhật' };

export default async function ProductUpdate({ params }: PropsType) {
  const res = await getDetailCategory(params.id);
  const parentCategory = await getAllCategoryParents();
  const category = res.category;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <CategoryForm initCategory={category} parentsCategory={parentCategory} />
    </>
  );
}
