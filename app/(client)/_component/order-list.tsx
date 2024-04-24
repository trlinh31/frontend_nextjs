'use client';
import ConfirmDialog from '@/app/(client)/_component/confirm';
import OrderItem from '@/app/(client)/_component/order-item';
import Rating from '@/app/(client)/_component/rating';
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
  const [isOpenRatingModal, setOpenRatingModal] = useState(false);
  const [idTransaction, setIdTransaction] = useState('');
  const [idProduct, setIdProduct] = useState('');

  const handleShowConfirmDialog = (id: string) => {
    setOpen(!isOpen);
    setIdTransaction(id);
  };

  const handleShowRatingModal = (id: string) => {
    setOpenRatingModal(!isOpen);
    setIdProduct(id);
  };

  return (
    <div className='space-y-8'>
      {orders?.map((order: any, orderIndex: number) => (
        <div key={orderIndex} className='space-y-4'>
          <p>
            Order Code: {order.code} | Trạng thái: {displayStatus(order.status)}
          </p>
          <div className='grid grid-cols-6'>
            <div className='col-span-5'>
              {order.transactionDetails.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className='mb-4'>
                  <OrderItem transaction={item} />
                  {order.status === 2 && (
                    <Button variant={'destructive'} onClick={() => handleShowRatingModal(item.product.id)} className='mt-4'>
                      Đánh giá sản phẩm
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className='col-span-1'>
              {order.status === 1 && <Button onClick={() => handleShowConfirmDialog(order.id)}>Đã nhận được hàng</Button>}
            </div>
          </div>
        </div>
      ))}
      <ConfirmDialog isOpen={isOpen} setOpen={setOpen} idTransaction={idTransaction} />
      <Rating isOpen={isOpenRatingModal} setOpen={setOpenRatingModal} idProduct={idProduct} />
    </div>
  );
}
