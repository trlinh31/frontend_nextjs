'use client';
import ConfirmDialog from '@/app/(client)/_component/confirm';
import OrderItem from '@/app/(client)/_component/order-item';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const displayStatus = (status: number) => {
  switch (status) {
    case 0:
      return 'Đã hủy';
    case 1:
      return 'Đã đặt';
    case 2:
      return 'Đã nhận hàng';
  }
};

export default function OrderListComponent({ orders }: { orders: any[] }) {
  const [isOpen, setOpen] = useState(false);
  const [idTransaction, setIdTransaction] = useState('');

  const handleShowConfirmDialog = (id: string) => {
    setOpen(!isOpen);
    setIdTransaction(id);
  };

  return (
    <div className='space-y-8'>
      {orders.map((order: any, orderIndex: number) => (
        <div key={orderIndex} className='space-y-4'>
          <p>
            Order Code: {order.code} | Trạng thái: {displayStatus(order.status)}
          </p>
          <div className='grid grid-cols-6'>
            <div className='col-span-5'>
              {order.transactionDetails.map((item: any, itemIndex: number) => (
                <OrderItem key={itemIndex} transaction={item} />
              ))}
            </div>
            <div className='col-span-1'>
              {order.status === 1 && <Button onClick={() => handleShowConfirmDialog(order.id)}>Đã nhận được hàng</Button>}
            </div>
          </div>
        </div>
      ))}
      <ConfirmDialog isOpen={isOpen} setOpen={setOpen} idTransaction={idTransaction} />
    </div>
  );
}
