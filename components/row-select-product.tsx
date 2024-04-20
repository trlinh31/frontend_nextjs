'use client';
import { getProductDetails, getProductsByName } from '@/api/product';
import { ComboboxComponent } from '@/components/combobox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/types/product.type';
import { formatPrice } from '@/utils/formatPrice';
import { useEffect, useState } from 'react';

type ProductOption = {
  value: string;
  label: string;
};

export default function RowSelectProduct({ setTransactions }: { setTransactions: any }) {
  const [searchKeyword, setSearchKeyword] = useState<string>(''); //Tìm kiếm sử dụng cho thẻ select
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]); //Danh sách sản phẩm sử dụng cho thẻ select
  const [product, setProduct] = useState<Product | null>(null); //Lưu trữ thông tin của sản phẩm khi chọn
  const [selectedValue, setSelectedValue] = useState(''); //Id của sản phẩm khi chọn ở thẻ select
  const [totalPrice, setTotalPrice] = useState(0); //Tổng tiền của một sản phẩm
  const [quantity, setQuantity] = useState(0); //Tổng số lượng của một sản phẩm

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
    setTotalPrice(0);
  }, [selectedValue]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value));
    const totalPriceProduct = product ? product.importPrice * parseInt(event.target.value) : 0;
    setTotalPrice(totalPriceProduct);
  };

  const handleProductSelect = (productId: string) => {
    setSelectedValue(productId);
  };

  const handleSubmit = () => {
    if (selectedValue && quantity > 0) {
      setTransactions(selectedValue, quantity, totalPrice);
    }
  };

  return (
    <>
      <div className='col-span-4'>
        <ComboboxComponent
          options={productOptions}
          setSelectedValue={handleProductSelect}
          keySearch={searchKeyword}
          setKeySearch={setSearchKeyword}
        />
      </div>
      <div className='col-span-2 flex items-center'>{formatPrice(product ? product.importPrice : 0)}</div>
      <div className='col-span-2'>
        <Input type='number' min={1} onChange={handleQuantityChange} value={quantity} max={product?.quantity} className='w-[100px]' />
      </div>
      <div className='col-span-2 flex items-center'>{formatPrice(totalPrice)}</div>
      <div className='col-span-1'>
        <Button onClick={() => handleSubmit()}>Thêm</Button>
      </div>
    </>
  );
}
