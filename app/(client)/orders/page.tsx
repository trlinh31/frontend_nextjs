import { getOrderHistory } from '@/api/transaction';
import OrderList from '@/app/(client)/_component/order-list';
import { decodeToken } from '@/utils/sessionToken';
import { cookies } from 'next/headers';

export default async function OrderPage() {
  const token = cookies().get('accessToken')?.value ?? '';
  const decodedToken = decodeToken(token);
  let order = [];
  if (decodedToken) {
    const { data } = await getOrderHistory(decodedToken.sub);
    order = data && [...data];
  }

  return (
    <div className='container max-w-[1366px] py-20'>
      <h1 className='font-bold text-2xl uppercase text-neutral-800 pb-10'>Đơn hàng ({order?.length ?? 0})</h1>
      <OrderList orders={order} />
    </div>
  );
}
