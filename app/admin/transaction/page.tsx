import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_TRANSACTION } from '@/constants/url';
import { Transaction } from '@/types/transaction.type';
import { getAllTransactions } from '@/api/transaction';
import TransactionTable from '@/app/admin/transaction/_components/transaction.table';

type paramsProps = {
  searchParams: {
    [key: string]: number;
  };
};

const breadcrumbItem = { title: 'Đơn hàng', link: URL_SHOW_TRANSACTION };

export default async function ProductPage({ searchParams }: paramsProps) {
  let transactions: Transaction[] = [];
  let totalPage = 0;
  const page = searchParams?.page ?? 0;
  const { data, totalPages } = await getAllTransactions(page);
  transactions = data && [...data.filter((item: Transaction) => item.enable)];
  totalPage = totalPages;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <div className='mt-10'>
        <TransactionTable transactions={transactions} pagination={{ currentPage: page, totalPage: totalPages }} />
      </div>
    </>
  );
}
