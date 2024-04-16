import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_STOCK } from '@/constants/url';
import { getAllTransactions } from '@/api/transaction';
import TransactionTable from '@/app/admin/transaction/_components/transaction.table';
import { Stock } from '@/types/stock';
import StockTable from '@/app/admin/stock/_components/stock.table';
import { getAllStocks } from '@/api/stock';

type paramsProps = {
  searchParams: {
    [key: string]: number;
  };
};

const breadcrumbItem = { title: 'Phiếu nhập hàng', link: URL_SHOW_STOCK };

export default async function StockPage({ searchParams }: paramsProps) {
  let stocks: Stock[] = [];
  let totalPage = 0;
  const page = searchParams?.page ?? 0;
  const { data, totalPages } = await getAllStocks(page);
  stocks = data && [...data];
  totalPage = totalPages;

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <div className='mt-10'>
        <StockTable stocks={stocks} pagination={{ currentPage: page, totalPage: totalPages }} />
      </div>
    </>
  );
}
