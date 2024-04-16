'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import RowSelectProduct from '@/components/row-select-product';
import { Trash2 } from 'lucide-react';
import { createStock } from '@/api/stock';
import { URL_SHOW_STOCK } from '@/constants/url';

export default function StockForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [row, setRow] = useState<any>([]);

  const [stocks, setStocks] = useState<any>({ billInvoice: 0, stockInDetails: [] });

  const handleTransitonsChange = (productId: string, quantity: number, total: number) => {
    const updatedStock = { ...stocks };
    const existingItem = updatedStock.stockInDetails.find((item: any) => item.product.id === productId);
    if (!existingItem) {
      setStocks((prevStock: any) => ({
        stockInDetails: [
          ...prevStock.stockInDetails,
          {
            product: {
              id: productId,
            },
            quantity: quantity,
            total: total,
          },
        ],
        billInvoice: total + prevStock.billInvoice,
      }));
      toast({ description: 'Thêm sản phẩm thành công' });
    }
  };

  const handleButtonAddRow = () => {
    const newRow = [...row, <RowSelectProduct setTransactions={handleTransitonsChange} key={row.length} />];
    setRow(newRow);
  };

  const handleButtonDeleteRow = (index: number) => {
    const newRow = [...row];
    newRow.splice(index, 1);
    setRow(newRow);
  };

  const onSubmit = async () => {
    if (stocks.stockInDetails.length > 0) {
      const successMessage = 'Tạo phiếu nhập hàng thành công';
      try {
        const res = await createStock(stocks);
        if (res === 200) {
          toast({ description: successMessage });
          router.refresh();
          router.push(URL_SHOW_STOCK);
        }
      } catch {
        toast({ description: 'Tạo phiếu nhập hàng thất bại' });
      }
    } else {
      toast({
        variant: 'destructive',
        description: 'Vui lòng chọn sản phẩm',
      });
      return;
    }
  };

  return (
    <>
      <div className='mt-10 space-y-6'>
        <div className='grid grid-cols-12 w-full border-b pb-3 text-gray-400'>
          <div className='col-span-1'></div>
          <div className='col-span-4'>Sản phẩm</div>
          <div className='col-span-2'>Giá</div>
          <div className='col-span-2'>Số lượng</div>
          <div className='col-span-2'>Giá trị</div>
          <div className='col-span-1'></div>
        </div>
        <div className='grid grid-cols-12 w-full'>
          <div className='col-span-1 flex items-center'></div>
          <RowSelectProduct setTransactions={handleTransitonsChange} />
        </div>
        {row.map((item: any, index: number) => (
          <div key={index} className='grid grid-cols-12 w-full'>
            <div className='col-span-1 flex items-center'>
              <button onClick={() => handleButtonDeleteRow(index)}>
                <Trash2 className='text-gray-500' color='red' />
              </button>
            </div>
            {item}
          </div>
        ))}
      </div>
      <div className='flex items-start mt-10 gap-x-4'>
        <Button variant={'outline'} onClick={handleButtonAddRow}>
          Thêm sản phẩm
        </Button>
        <Button onClick={onSubmit}>Lưu</Button>
      </div>
    </>
  );
}
