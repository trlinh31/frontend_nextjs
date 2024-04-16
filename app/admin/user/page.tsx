import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_USER } from '@/constants/url';
import UserTable from '@/app/admin/user/_components/user.table';
import { User } from '@/types/user.type';
import { getAllUsers } from '@/api/user';

type paramsProps = {
  searchParams: {
    [key: string]: number;
  };
};

const breadcrumbItem = { title: 'Tài khoản', link: URL_SHOW_USER };

export default async function ProductPage({ searchParams }: paramsProps) {
  let users: User[] = [];
  let totalPage = 0;
  const page = searchParams?.page ?? 0;
  const { data, totalPages } = await getAllUsers(page);
  users = data && [...data.filter((item: User) => item.enable)];
  totalPage = totalPages;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <div className='mt-10'>
        <UserTable users={users} pagination={{ currentPage: Number(page), totalPage: totalPage }} />
      </div>
    </>
  );
}
