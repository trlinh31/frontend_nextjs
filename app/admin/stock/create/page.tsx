import StockForm from '@/app/admin/stock/_components/stock.form';
import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_STOCK } from '@/constants/url';

const breadcrumbItem = { title: 'Phiếu nhập hàng', link: URL_SHOW_STOCK, action: 'Thêm mới' };

export default function StockCreate() {
  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <StockForm />
    </>
  );
}
