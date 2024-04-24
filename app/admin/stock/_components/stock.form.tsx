'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RowSelectProduct from '@/components/row-select-product';
import { Trash2 } from 'lucide-react';
import { createStock } from '@/api/stock';
import { URL_SHOW_STOCK } from '@/constants/url';
import { useProductId, useProductStore } from '@/zustand/storeProducts';
import { formatPrice } from '@/utils/formatPrice';
import { Stock } from '@/types/stock';
import { useId } from 'react';

export default function StockForm({ initStock }: { initStock?: Stock }) {
  const id = useId();
  const { productStore, calcTotalPrice, removeAllItem, removeItem } = useProductStore();
  const { removeIdStore } = useProductId();
  const { toast } = useToast();
  const router = useRouter();
  const [row, setRow] = useState<any>([]);

  const handleButtonAddRow = () => {
    const index = row.length;
    const newRow = <RowSelectProduct key={index} index={index} isStockForm={true} />;
    setRow([...row, newRow]);
  };

  const onSubmit = async () => {
    if (productStore.length > 0) {
      const successMessage = 'Tạo phiếu nhập hàng thành công';
      const stocks = {
        billInvoice: calcTotalPrice(),
        stockInDetails: productStore,
      };
      console.log(stocks);
      const res = await createStock(stocks);
      if (res !== 200) {
        toast({ variant: 'destructive', description: 'Tạo phiếu nhập hàng thất bại' });
        return;
      }
      removeAllItem();
      toast({ description: successMessage });
      router.push(URL_SHOW_STOCK);
    } else {
      toast({
        variant: 'destructive',
        description: 'Vui lòng chọn sản phẩm',
      });
      return;
    }
  };

  const handleRemoveRow = (index: number) => {
    const newRow = [...row];
    newRow.splice(index, 1);
    setRow(newRow);
    removeItem(index);
    removeIdStore(index);
  };

  return (
    <>
      <div className='mt-10 space-y-6'>
        <div className='grid grid-cols-12 w-full border-b pb-3 text-gray-400'>
          <div className='col-span-1'>Xoá</div>
          <div className='col-span-4'>Sản phẩm</div>
          <div className='col-span-1'>SL tồn</div>
          <div className='col-span-2'>Giá Bán</div>
          <div className='col-span-2'>Số lượng</div>
          <div className='col-span-2'>Thành tiền</div>
        </div>
        {initStock &&
          initStock.stockInDetails.map((item: any, index: number) => (
            <div className='grid grid-cols-12' key={index}>
              <div className='col-span-1'>
                <Button variant={'destructive'} onClick={() => handleRemoveRow(index)}>
                  <Trash2 />
                </Button>
              </div>
              <RowSelectProduct key={item.id} index={index} initProduct={item} isStockForm={true} />
            </div>
          ))}
        {row.map((item: any, index: number) => (
          <div className='grid grid-cols-12' key={index}>
            <div className='col-span-1'>
              <Button variant={'destructive'} onClick={() => handleRemoveRow(index)}>
                <Trash2 />
              </Button>
            </div>
            {item}
          </div>
        ))}
      </div>
      <div className='flex items-start justify-between mt-10 gap-x-4'>
        <div className='flex gap-x-4'>
          <Button variant={'outline'} onClick={handleButtonAddRow}>
            Thêm sản phẩm
          </Button>
          <Button onClick={onSubmit}>Lưu</Button>
        </div>
        <div>
          <h3 className='font-bold text-2xl'>
            Tổng tiền: <span>{formatPrice(calcTotalPrice())}</span>
          </h3>
        </div>
      </div>
    </>
  );
}
