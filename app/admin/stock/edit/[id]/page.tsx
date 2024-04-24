import { getDetailStock } from '@/api/stock';
import StockForm from '@/app/admin/stock/_components/stock.form';
import BreadCrumb from '@/components/breadcrumb';
import { URL_SHOW_STOCK } from '@/constants/url';

type PropsType = {
  params: {
    id: string;
  };
};

const breadcrumbItem = { title: 'Phiếu nhập hàng', link: URL_SHOW_STOCK, action: 'Cập nhật' };

export default async function ProductUpdate({ params }: PropsType) {
  const { data } = await getDetailStock(params.id);

  return (
    <>
      <BreadCrumb item={breadcrumbItem} />
      <StockForm initStock={data} />
    </>
  );
}
