'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TransactionSchemaType, TransactionSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Customer } from '@/types/customer.type';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { URL_SHOW_TRANSACTION } from '@/constants/url';
import { useEffect, useId, useState } from 'react';
import RowSelectProduct from '@/components/row-select-product';
import { Trash2 } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';
import Link from 'next/link';
import { createTransaction } from '@/api/transaction';
import RowSelectCustomer from '@/components/row-select-customer';
import { Label } from '@/components/ui/label';
import Select from 'react-select';
import { getProductsByName } from '@/api/product';
import { Product } from '@/types/product.type';

export default function TransactionForm() {
  const id = useId();
  const { toast } = useToast();
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | undefined>();
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]);

  const form = useForm<TransactionSchemaType>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      customer: {
        username: '',
      },
      name: '',
      email: '',
      address: '',
      note: '',
      transactionDetails: [],
    },
  });

  useEffect(() => {
    form.setValue('customer.username', customer?.username ?? '');
    form.setValue('name', customer?.fullName ?? '');
    form.setValue('email', customer?.email ?? '');
    form.setValue('address', customer?.address ?? '');
  }, [customer, form]);

  const handleRemoveProduct = (index: number) => {
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
          .filter((item: Product) => !selectedProducts.some((product: any) => product.value === item.id) && item.quantity > 0)
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
    if (newQuantity > selectedProducts[index].quantity) return;
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantityToBuy = newQuantity;
    setSelectedProducts(updatedProducts);
  };

  const totalPrice = selectedProducts.reduce((total: number, product: any) => {
    return total + product.price * product.quantityToBuy;
  }, 0);

  const onSubmit = async (data: TransactionSchemaType) => {
    if (selectedProducts.length === 0) {
      toast({
        variant: 'destructive',
        description: 'Vui lòng chọn sản phẩm',
      });
      return;
    }

    const payload = selectedProducts.map(({ value, label, price, quantity, quantityToBuy }: any) => ({
      product: {
        id: value,
      },
      quantity: quantityToBuy,
      total: price * quantityToBuy,
    }));

    const isCheck = payload.some((item: any) => item.quantity === 0);
    if (isCheck) {
      toast({
        variant: 'destructive',
        description: 'Vui lòng nhập số lượng sản phẩm',
      });
      return;
    }

    data.transactionDetails = payload;

    const res = await createTransaction(data);
    if (res !== 200) {
      toast({
        variant: 'destructive',
        description: 'Thêm đơn hàng thất bại',
      });
      return;
    }
    toast({
      description: 'Thêm đơn hàng thành công',
    });
    router.push(URL_SHOW_TRANSACTION);
  };

  return (
    <>
      <div className='pb-32'>
        <div className='mt-10 space-y-6'>
          <div className='flex items-center gap-x-3'>
            <Label>Chọn khách hàng:</Label>
            <RowSelectCustomer setCustomer={setCustomer} />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (error) => {
                console.log(error);
              })}
              className='space-y-8'
              autoComplete='off'>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ tên:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='note'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ghi chú:</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mt-10 space-y-6'>
                <Select
                  instanceId={id}
                  onChange={handleProductChange}
                  onInputChange={setKeyword}
                  options={searchResults}
                  getOptionValue={(option) => option.value}
                  getOptionLabel={(option) => option.label}
                  placeholder={'Chọn sản phẩm'}
                  isClearable={false}
                  isSearchable
                />
                <div className='grid grid-cols-12 border-b pb-4 font-bold'>
                  <div className='col-span-1'>Xoá</div>
                  <div className='col-span-4'>Tên sản phẩm</div>
                  <div className='col-span-1'>SL tồn</div>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-2'>Số lượng</div>
                  <div className='col-span-2'>Thành tiền</div>
                </div>
                {selectedProducts.map((product: any, index: number) => (
                  <div key={id + index} className='grid grid-cols-12'>
                    <div className='col-span-1 flex items-center'>
                      <button onClick={() => handleRemoveProduct(index)}>
                        <Trash2 />
                      </button>
                    </div>
                    <div className='col-span-4 flex items-center'>{product.label}</div>
                    <div className='col-span-1 flex items-center'>{product.quantity}</div>
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
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-4'>
                  <Button type='button' variant='secondary' asChild>
                    <Link href={URL_SHOW_TRANSACTION}>Huỷ</Link>
                  </Button>
                  <Button type='submit'>Lưu</Button>
                </div>
                <div>
                  <h3 className='font-bold text-2xl'>
                    Tổng tiền: <span>{formatPrice(totalPrice)}</span>
                  </h3>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
