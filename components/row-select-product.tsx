'use client';
import { useEffect, useId, useState } from 'react';
import { getProductDetails, getProductsByName } from '@/api/product';
import { ComboboxComponent } from '@/components/combobox';
import { Input } from '@/components/ui/input';
import { Product } from '@/types/product.type';
import { formatPrice } from '@/utils/formatPrice';
import { useProductId, useProductStore } from '@/zustand/storeProducts';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Select from 'react-select';

interface RowSelectProductProps {
  index?: number;
  isStockForm?: boolean;
  initProduct?: any;
}
type ProductOption = {
  value: string;
  label: string;
};

export default function RowSelectProduct({
  productOptions,
  selectedProduct,
  onProductChange,
  quantity,
  onQuantityChange,
  onRemove,
  price,
  loadOptions,
  quantityAmount,
}: any) {
  const totalPrice = price * quantity;
  const id = useId();
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-1 flex items-center'>
        <button onClick={onRemove}>
          <Trash2 />
        </button>
      </div>
      <div className='col-span-4'>
        <Select
          instanceId={id}
          className='w-[300px]'
          value={selectedProduct.value}
          onChange={(option) => onProductChange(option.value, option.importPrice * quantity)}
          options={productOptions}
          onInputChange={loadOptions}
        />
      </div>
      <div className='col-span-1 flex items-center'>{quantityAmount}</div>
      <div className='col-span-2 flex items-center'>{formatPrice(price)}</div>
      <div className='col-span-2'>
        <Input
          type='number'
          className='w-[100px]'
          min={0}
          value={quantity}
          onChange={(e) => onQuantityChange(e.target.value, Number(e.target.value) * price)}
        />
      </div>
      <div className='col-span-2'>{formatPrice(totalPrice)}</div>
    </div>
  );
}
