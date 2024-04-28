'use client';
import ConfirmDialog from '@/app/(client)/_component/confirm';
import OrderItem from '@/app/(client)/_component/order-item';
import Rating from '@/app/(client)/_component/rating';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Transaction } from '@/types/transaction.type';
import { formatPrice } from '@/utils/formatPrice';
import { useState } from 'react';

const displayStatus = (status: number) => {
  switch (status) {
    case 0:
      return 'Đã hủy';
    case 1:
      return 'Đang chờ xác nhận';
    case 2:
      return 'Đang giao hàng';
    case 3:
      return 'Đã nhận hàng';
  }
};

export default function OrderListComponent({ orders }: { orders: Transaction[] }) {
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
      {orders.map((order: Transaction, orderIndex: number) => (
        <div key={orderIndex} className='space-y-4 border-b pb-4'>
          <p>
            Order Code: {order.code} | Trạng thái: {displayStatus(order.status)} | Tổng thanh toán: {formatPrice(order.billInvoice)}
          </p>
          <div className='grid grid-cols-6'>
            <div className='col-span-5'>
              {order.transactionDetails.map((item: any, itemIndex: number) => (
                <div key={itemIndex} className='mb-4'>
                  <OrderItem transaction={item} />
                  {order.status === 3 && (
                    <Button variant={'ghost'} onClick={() => handleShowRatingModal(item.product.id)} className='mt-4'>
                      Đánh giá sản phẩm
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className='col-span-1'>
              {order.status === 2 && <Button onClick={() => handleShowConfirmDialog(order.id)}>Đã nhận được hàng</Button>}
            </div>
          </div>
        </div>
      ))}
      <ConfirmDialog isOpen={isOpen} setOpen={setOpen} idTransaction={idTransaction} />
      <Rating isOpen={isOpenRatingModal} setOpen={setOpenRatingModal} idProduct={idProduct} />
    </div>
  );
}
