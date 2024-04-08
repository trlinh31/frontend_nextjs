import BreadCrumb from '@/components/breadcrumb';
import { getAllCategories } from '@/api/category';
import { URL_SHOW_CUSTOMER } from '@/constants/url';
import CategoryTable from '@/app/admin/danh-muc/_components/danh-muc.table';
import { Category } from '@/types/categoryType';

type paramsProps = {
  searchParams: {
    [key: string]: number;
  };
};

const breadcrumbItem = { title: 'Danh mục sản phẩm', link: URL_SHOW_CUSTOMER };

export default async function CategoryPage({ searchParams }: paramsProps) {
  let categories: Category[] = [];
  let totalPage = 0;
  const page = searchParams?.page ?? 0;
  const { data, totalPages } = await getAllCategories(page);
  categories = data && [...data?.filter((item: Category) => item.enable)];
  totalPage = totalPages;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <div className='mt-10'>
        <CategoryTable categories={categories} pagination={{ currentPage: Number(page), totalPage: totalPage }} />
      </div>
    </>
  );
}
