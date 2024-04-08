import { getAllCategories } from '@/api/category';
import { getProductDetails } from '@/api/product';
import ProductForm from '@/app/admin/san-pham/_components/san-pham.form';
import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_PRODUCT } from '@/constants/url';

type PropsType = {
  params: {
    id: string;
  };
};

const breadcrumbItem = { title: 'Sản phẩm', link: URL_SHOW_PRODUCT, action: 'Cập nhật' };

export default async function ProductUpdate({ params }: PropsType) {
  const res = await getProductDetails(params.id);
  const categoriesRes = await getAllCategories();
  const product = res?.data;
  const categories = categoriesRes?.data;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <ProductForm initProduct={product} categories={categories ? categories : []} />
    </>
  );
}
