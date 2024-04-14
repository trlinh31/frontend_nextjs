import BreadCrumb from '@/components/breadcrumb';
import ProductForm from '@/app/admin/product/_components/product.form';
import { URL_SHOW_PRODUCT } from '@/constants/url';
import { getAllCategoriesAndParent } from '@/api/category';

const breadcrumbItem = { title: 'Sản phẩm', link: URL_SHOW_PRODUCT, action: 'Thêm mới' };

export default async function ProductCreate() {
  const res = await getAllCategoriesAndParent();
  const categories = res?.data;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <ProductForm categories={categories ?? []} />
    </>
  );
}
