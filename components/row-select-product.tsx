'use client';
import { getProductDetails, getProductsByName } from '@/api/product';
import { ComboboxComponent } from '@/components/combobox';
import { Input } from '@/components/ui/input';
import { Product } from '@/types/product.type';
import { formatPrice } from '@/utils/formatPrice';
import { CirclePlus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type ProductOption = {
  value: string;
  label: string;
};

export default function RowSelectProduct({ setTransactions }: { setTransactions: any }) {
  const [searchKeyword, setSearchKeyword] = useState<string>(''); //Tìm kiếm sử dụng cho thẻ select
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]); //Danh sách sản phẩm sử dụng cho thẻ select
  const [product, setProduct] = useState<Product | null>(null); //Lưu trữ thông tin của sản phẩm khi chọn
  const [selectedValue, setSelectedValue] = useState(null); //Id của sản phẩm khi chọn ở thẻ select
  const [price, setPrice] = useState(0); //Tổng tiền của một sản phẩm)
  const [quantity, setQuantity] = useState(0); //Tổng tiền của một sản phẩm)

  const fetchProduct = async () => {
    const { data } = await getProductsByName(searchKeyword);
    if (data) {
      const options = data.map(({ id, name }: { id: string; name: string }) => ({ value: id, label: name }));
      setProductOptions(options);
    }
  };

  const fetchDetailProduct = async () => {
    if (selectedValue) {
      const { data } = await getProductDetails(selectedValue);
      setProduct(data);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [searchKeyword]);

  useEffect(() => {
    fetchDetailProduct();
    setQuantity(0);
    setPrice(0);
  }, [selectedValue]);

  const handlePriceChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      const newPrice = product.price * Number(event.target.value);
      const newQuantity = Number(event.target.value);
      setPrice(newPrice);
      setQuantity(newQuantity);

      setTransactions((prevTransactions: any) => [
        ...prevTransactions,
        {
          product: { id: selectedValue },
          quantity: newQuantity,
          total: product.price * newQuantity,
        },
      ]);
    }
  };

  return (
    <>
      <div className='w-[300px]'>
        <ComboboxComponent options={productOptions} setSelectedValue={setSelectedValue} keySearch={searchKeyword} setKeySearch={setSearchKeyword} />
      </div>
      <div className='w-[200px]'>{formatPrice(product ? product.price : 0)}</div>
      <div className='w-[200px]'>
        <Input type='number' min={1} onChange={handlePriceChange} value={quantity} className='w-[100px]' />
      </div>
      <div className='w-[200px]'>{formatPrice(product ? price : 0)}</div>
    </>
  );
}
