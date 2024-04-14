import TransactionForm from '@/app/admin/transaction/_components/transaction.form';
import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_TRANSACTION } from '@/constants/url';

const breadcrumbItem = { title: 'Đơn hàng', link: URL_SHOW_TRANSACTION, action: 'Thêm mới' };

export default function TransactionCreate() {
  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <TransactionForm />
    </>
  );
}
