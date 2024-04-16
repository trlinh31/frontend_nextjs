'use client';
import Badge from '@/components/badge';
import { DialogContent, Dialog } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatPrice } from '@/utils/formatPrice';

type ModalProps = {
  transaction: any;
  isOpen: boolean;
  setOpen: any;
};

const statusTransaction = (status: number) => {
  switch (status) {
    case 0:
      return 'Đã huỷ';
    case 1:
      return 'Chờ xác nhận';
    default:
      return 'Hoàn thành';
  }
};

export default function TransactionModal({ transaction, isOpen, setOpen }: ModalProps) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[600px] bg-gray-200 p-8'>
          <div className='grid grid-cols-2 gap-x-1'>
            <div className='flex flex-col bg-white p-4 leading-8'>
              <p className='text-gray-400 font-bold text-sm'>Mã đơn hàng#</p>
              <h3 className='font-bold text-gray-700'>{transaction?.code}</h3>
            </div>
            <div className='flex flex-col bg-white p-4 leading-8'>
              <p className='text-gray-400 font-bold text-sm'>Trạng thái#</p>
              <h3 className='font-bold'>{statusTransaction(transaction?.status)}</h3>
            </div>
          </div>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-gray-600 uppercase'>Thông tin khách hàng</h2>
            <div className='grid grid-cols-2 gap-1'>
              <div className='flex flex-col bg-white p-4'>
                <p className='text-gray-400 font-bold text-sm'>Tên khách hàng#</p>
                <h3 className='font-bold text-gray-700'>{transaction?.customer?.fullName ?? transaction?.name}</h3>
              </div>
              <div className='flex flex-col bg-white p-4'>
                <p className='text-gray-400 font-bold text-sm'>Email#</p>
                <h3 className='font-bold text-gray-700'>{transaction?.customer?.email ?? transaction?.email}</h3>
              </div>
              <div className='flex flex-col bg-white p-4'>
                <p className='text-gray-400 font-bold text-sm'>Địa chỉ#</p>
                <h3 className='font-bold text-gray-700'>{transaction?.customer?.address ?? transaction?.address}</h3>
              </div>
              <div className='flex flex-col bg-white p-4'>
                <p className='text-gray-400 font-bold text-sm'>Ghi chú#</p>
                <h3 className='font-bold text-gray-700'>{transaction?.note}</h3>
              </div>
            </div>
          </div>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-gray-600 uppercase'>Thông tin đơn hàng</h2>
            <Table className='border'>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-center'>STT</TableHead>
                  <TableHead className='text-center'>Tên sản phẩm</TableHead>
                  <TableHead className='text-center'>Số lượng</TableHead>
                  <TableHead className='text-center'>Đơn giá</TableHead>
                  <TableHead className='text-center'>Thành tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='text-center'>
                {transaction?.transactionDetails?.map((item: any, index: number) => (
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatPrice(item.sellPrice)}</TableCell>
                    <TableCell>{formatPrice(item.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Tổng cộng</TableCell>
                  <TableCell className='text-right font-bold'>{formatPrice(transaction?.billInvoice)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
