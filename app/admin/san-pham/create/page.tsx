import BreadCrumb from '@/components/breadcrumb';
import ProductForm from '@/app/admin/san-pham/_components/san-pham.form';
import { URL_SHOW_PRODUCT } from '@/constants/url';
import { getAllCategories } from '@/api/category';

const breadcrumbItem = { title: 'Sản phẩm', link: URL_SHOW_PRODUCT, action: 'Thêm mới' };

export default async function ProductCreate() {
  const res = await getAllCategories();
  const categories = res?.data;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <ProductForm categories={categories ?? []} />
    </>
  );
}
