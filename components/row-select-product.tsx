'use client';
import { useEffect, useState } from 'react';
import { getProductDetails, getProductsByName } from '@/api/product';
import { ComboboxComponent } from '@/components/combobox';
import { Input } from '@/components/ui/input';
import { Product } from '@/types/product.type';
import { formatPrice } from '@/utils/formatPrice';
import { useProductId, useProductStore } from '@/zustand/storeProducts';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface RowSelectProductProps {
  index?: number;
  isStockForm?: boolean;
  initProduct?: any;
}
type ProductOption = {
  value: string;
  label: string;
};

export default function RowSelectProduct({ index = 0, isStockForm, initProduct }: RowSelectProductProps) {
  const { productStore, setProductStore, updateProductStore, removeItem } = useProductStore();
  const { idStore, setIdStore } = useProductId();
  const [selectedValue, setSelectedValue] = useState(initProduct ? initProduct.id : ''); //Id của sản phẩm khi chọn ở thẻ select
  const [searchKeyword, setSearchKeyword] = useState<string>(''); //Tìm kiếm sử dụng cho thẻ select
  const [product, setProduct] = useState<Product>(); //Lưu trữ thông tin của sản phẩm khi chọn
  const [productOptions, setProductOptions] = useState<ProductOption[]>(initProduct ? initProduct.product : []); //Danh sách sản phẩm render ra thẻ select
  const [quantity, setQuantity] = useState(0); //Số lượng của một sản phẩm

  useEffect(() => {
    if (initProduct) {
      const newObject = {
        value: initProduct.product.id,
        label: initProduct.product.name,
      };
      setProductOptions([newObject]);
    }
  }, []);

  const fetchProductByName = async () => {
    const { data } = await getProductsByName(initProduct ? initProduct.product.name : searchKeyword);
    if (data) {
      let productOptionsData;
      if (isStockForm) {
        productOptionsData = data
          .filter((item: Product) => !idStore.includes(item.id))
          .map(({ id, name }: { id: string; name: string }) => ({ value: id, label: name }));
      } else {
        productOptionsData = data
          .filter((item: Product) => item.quantity > 0 && !idStore.includes(item.id))
          .map(({ id, name }: { id: string; name: string }) => ({ value: id, label: name }));
      }
      setProductOptions(productOptionsData);
    }
  };

  useEffect(() => {
    fetchProductByName();
  }, [searchKeyword]);

  const fetchDetailProduct = async () => {
    if (selectedValue) {
      const { data } = await getProductDetails(selectedValue);
      if (data) {
        setProduct(data);
      }
    }
  };

  const handleProductChange = () => {
    if (!product) return;
    updateProductStore(index, { product: { id: selectedValue }, quantity, total: product.importPrice * quantity });
  };

  useEffect(() => {
    fetchDetailProduct();
  }, [selectedValue]);

  useEffect(() => {
    if (product) {
      handleProductChange();
    }
  }, [product]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueInput = Number(event.target.value);
    if (!product) return;
    if (product && !isStockForm && valueInput > product.quantity) return;
    setQuantity(valueInput);
    setProductStore({
      product: { id: selectedValue },
      quantity: valueInput,
      total: valueInput * product.importPrice,
    });
  };

  const handleProductSelect = (productId: string) => {
    setSelectedValue(productId);
    setIdStore(productId);
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
      <div className='col-span-1 flex items-center'>{product ? product.quantity : 0}</div>
      <div className='col-span-2 flex items-center'>{formatPrice(product ? product.importPrice : 0)}</div>
      <div className='col-span-2'>
        <Input type='number' min={0} onChange={handleQuantityChange} value={initProduct ? initProduct.quantity : quantity} className='w-[100px]' />
      </div>
      <div className='col-span-2 flex items-center'>{formatPrice(product ? product.importPrice * quantity : 0)}</div>
    </>
  );
}
