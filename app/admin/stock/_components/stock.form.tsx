'use client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { createOrUpdateStock } from '@/api/stock';
import { URL_SHOW_STOCK } from '@/constants/url';
import { formatPrice } from '@/utils/formatPrice';
import { Stock } from '@/types/stock';
import { getProductsByName } from '@/api/product';
import { Product } from '@/types/product.type';
import Select from 'react-select';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function StockForm({ initStock }: { initStock?: Stock }) {
  const id = useId();
  const { toast } = useToast();
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [keyword, setKeyword] = useState('');
  const [idStockDetail, setIdStockDetail] = useState<number[]>([]);
  const [searchResults, setSearchResults] = useState<any>([]);

  useEffect(() => {
    if (!initStock) return;
    const oldProduct = initStock.stockInDetails.map((item: any) => ({
      value: item.product.id,
      label: item.product.name,
      price: item.importPrice,
      quantity: item.product.quantity,
      quantityToBuy: item.quantity,
    }));
    setSelectedProducts([...oldProduct]);
  }, [initStock]);

  const handleRemoveProduct = (index: number, idStockDetailParam?: number) => {
    if (idStockDetailParam) {
      setIdStockDetail([...idStockDetail, idStockDetailParam]);
    }
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  useEffect(() => {
    handleSearchChange();
  }, [keyword]);

  const handleSearchChange = async () => {
    try {
      const { data } = await getProductsByName(keyword);
      if (data) {
        const productOptions = data
          .filter((item: Product) => !selectedProducts.some((product: any) => product.value === item.id))
          .map(({ id, name, importPrice, quantity }: any) => ({
            value: id,
            label: name,
            price: importPrice,
            quantity,
            quantityToBuy: 0,
          }));
        setSearchResults(productOptions);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setSearchResults([]);
    }
  };

  const handleProductChange = (selectedOption: any) => {
    setSelectedProducts([...selectedProducts, selectedOption]);
    setSearchResults([]);
  };

  // Xử lý thay đổi số lượng sản phẩm cần mua
  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantityToBuy = newQuantity;
    setSelectedProducts(updatedProducts);
  };

  const totalPrice = selectedProducts.reduce((total: number, product: any) => {
    return total + product.price * product.quantityToBuy;
  }, 0);

  const onSubmit = async () => {
    if (selectedProducts.length === 0) {
      toast({
        variant: 'destructive',
        description: 'Vui lòng chọn sản phẩm',
      });
      return;
    }

    const data = {
      id: initStock?.id ?? '',
      billInvoice: totalPrice,
      stockInDetails: selectedProducts.map(({ value, label, price, quantity, quantityToBuy }: any, index: number) => ({
        product: {
          id: value,
        },
        quantity: quantityToBuy,
        total: price * quantityToBuy,
        ...(initStock && initStock.stockInDetails[index] && { id: initStock.stockInDetails[index].id }),
      })),
      deletedDetails: idStockDetail,
    };

    const isCheck = data.stockInDetails.some((item: any) => item.quantity === 0);
    if (isCheck) {
      toast({
        variant: 'destructive',
        description: 'Vui lòng nhập số lượng sản phẩm',
      });
      return;
    }

    const res = await createOrUpdateStock(data);
    if (res !== 200) {
      toast({
        variant: 'destructive',
        description: 'Thêm phiếu nhập hàng thất bại',
      });
      return;
    }
    toast({
      description: 'Thêm phiếu nhập hàng thành công',
    });
    router.push(URL_SHOW_STOCK);
  };

  return (
    <>
      <div className='mt-10 space-y-6'>
        <Select
          instanceId={id}
          onChange={handleProductChange}
          onInputChange={setKeyword}
          options={searchResults}
          getOptionValue={(option) => option.value}
          getOptionLabel={(option) => option.label}
          className='text-black'
          placeholder={'Chọn sản phẩm'}
          isClearable={false}
          isSearchable
        />
        <div className='grid grid-cols-12 border-b pb-4 font-bold'>
          <div className='col-span-1'>Xoá</div>
          <div className='col-span-3'>Tên sản phẩm</div>
          <div className='col-span-2'>SL tồn</div>
          <div className='col-span-2'>Đơn giá</div>
          <div className='col-span-2'>Số lượng</div>
          <div className='col-span-2'>Thành tiền</div>
        </div>
        {selectedProducts.map((product: any, index: number) => (
          <div key={id + index} className='grid grid-cols-12'>
            <div className='col-span-1 flex items-center'>
              <button onClick={() => handleRemoveProduct(index, Number(initStock?.stockInDetails[index]?.id))}>
                <Trash2 />
              </button>
            </div>
            <div className='col-span-3 flex items-center'>{product.label}</div>
            <div className='col-span-2 flex items-center'>{product.quantity}</div>
            <div className='col-span-2 flex items-center'>{formatPrice(product.price)}</div>
            <div className='col-span-2 flex items-center'>
              <Input
                type='number'
                className='w-[100px]'
                value={product.quantityToBuy || 0}
                min={0}
                onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
              />
            </div>
            <div className='col-span-2 flex items-center'>{formatPrice(product.price * product.quantityToBuy)}</div>
          </div>
        ))}
      </div>
      <div className='flex items-start justify-between mt-10 gap-x-4'>
        <div className='flex items-center gap-x-4'>
          <Button variant={'outline'} asChild>
            <Link href={URL_SHOW_STOCK}>Huỷ</Link>
          </Button>
          <Button onClick={onSubmit}>Lưu</Button>
        </div>
        <div>
          <h3 className='font-bold text-2xl'>
            Tổng tiền: <span>{formatPrice(totalPrice)}</span>
          </h3>
        </div>
      </div>
    </>
  );
}
