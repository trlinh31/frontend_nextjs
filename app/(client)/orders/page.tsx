import { getOrderHistory } from '@/api/transaction';
import OrderList from '@/app/(client)/_component/order-list';

export default async function OrderPage() {
  const { data } = await getOrderHistory();

  return (
    <div className='container max-w-[1366px] py-20'>
      <h1 className='font-bold text-2xl uppercase text-neutral-800 pb-10'>Đơn hàng ({data?.length ?? 0})</h1>
      <OrderList orders={data} />
    </div>
  );
}
