'use client';
import { deleteStock } from '@/api/stock';
import ConfirmDialog from '@/components/alert-dialog';
import { Button } from '@/components/ui/button';
import { DialogContent, Dialog, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Stock } from '@/types/stock';
import { formatDate } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { useState } from 'react';

type ModalProps = {
  stock: Stock;
  isOpen: boolean;
  setOpen: any;
};

export default function StockModal({ stock, isOpen, setOpen }: ModalProps) {
  const { toast } = useToast();
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleDeleteStock = async () => {
    const res = await deleteStock(stock.id);
    if (res !== 200) {
      toast({
        variant: 'destructive',
        description: 'Xoá phiếu nhập hàng thất bại',
      });
      return;
    }
    toast({
      description: 'Xoá phiếu nhập hàng thành công',
    });
    setOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[800px] bg-gray-200 p-8'>
          <div className='grid grid-cols-2 gap-x-1'>
            <div className='flex flex-col bg-white p-4 leading-8'>
              <p className='text-gray-400 font-bold text-sm'>Mã phiếu#</p>
              <h3 className='font-bold text-gray-700'>{stock?.code}</h3>
            </div>
            <div className='flex flex-col bg-white p-4 leading-8'>
              <p className='text-gray-400 font-bold text-sm'>Ngày tạo phiếu#</p>
              <h3 className='font-bold text-gray-700'>{formatDate(stock?.createdDate)}</h3>
            </div>
          </div>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold text-gray-600 uppercase'>Thông tin chi tiết phiếu nhập hàng</h2>
            <Table className='border text-black'>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-center'>STT</TableHead>
                  <TableHead className='text-center'>Tên sản phẩm</TableHead>
                  <TableHead className='text-center'>Giá nhập</TableHead>
                  <TableHead className='text-center'>Số lượng</TableHead>
                  <TableHead className='text-center'>Thành tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className='text-center'>
                {stock?.stockInDetails?.map((item: any, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{formatPrice(item.importPrice)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatPrice(item.total)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>Tổng cộng</TableCell>
                  <TableCell className='text-right font-bold'>{formatPrice(stock?.billInvoice)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <DialogFooter>
            <Button variant={'outline'} onClick={() => setIsOpenDelete(true)}>
              Xoá phiếu nhập
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isOpenDelete && (
        <ConfirmDialog
          message='Bạn có muốn xoá phiếu nhập hàng'
          isOpenConfirm={isOpenDelete}
          setIsOpenConfirm={setIsOpenDelete}
          onConfirm={handleDeleteStock}
        />
      )}
    </>
  );
}
