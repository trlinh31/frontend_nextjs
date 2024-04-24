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
import { useEffect, useState } from 'react';
import RowSelectProduct from '@/components/row-select-product';
import { Trash2 } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';
import Link from 'next/link';
import { createTransaction } from '@/api/transaction';
import RowSelectCustomer from '@/components/row-select-customer';
import { Label } from '@/components/ui/label';
import { useProductStore } from '@/zustand/storeProducts';
import { Transaction } from '@/types/transaction.type';

export default function TransactionForm() {
  const { productStore, calcTotalPrice, removeAllItem } = useProductStore();
  const { toast } = useToast();
  const router = useRouter();
  const [row, setRow] = useState<any>([]);
  const [customer, setCustomer] = useState<Customer | undefined>();

  const handleButtonAddRow = () => {
    const newRow = {
      index: row.length,
      component: <RowSelectProduct />,
    };
    setRow([...row, newRow]);
  };

  // const handleButtonDeleteRow = (index: number) => {
  //   const newRow = [...row];
  //   newRow.splice(index, 1);
  //   setRow(newRow);
  // };

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
    form.setValue('email', customer?.email ?? 'aaa@gmail.com');
    form.setValue('address', customer?.address ?? 'aaaa');
  }, [customer, form]);

  const onSubmit = async (data: TransactionSchemaType) => {
    if (productStore.length > 0) {
      const successMessage = 'Tạo đơn hàng hàng thành công';
      data.transactionDetails = productStore;
      console.log(data);
      const res = await createTransaction(data);
      if (res !== 200) {
        toast({ variant: 'destructive', description: 'Tạo đơn hàng hàng thất bại' });
        return;
      }
      removeAllItem();
      toast({ description: successMessage });
      router.push(URL_SHOW_TRANSACTION);
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
              <div className='space-x-3'>
                <Button type='button' variant='secondary' asChild>
                  <Link href={URL_SHOW_TRANSACTION}>Huỷ</Link>
                </Button>
                <Button type='submit'>Lưu</Button>
              </div>
            </form>
          </Form>
          <div className='grid grid-cols-12 w-full border-b pb-3 text-gray-400'>
            <div className='col-span-4'>Sản phẩm</div>
            <div className='col-span-2'>SL tồn</div>
            <div className='col-span-2'>Giá Bán</div>
            <div className='col-span-2'>Số lượng</div>
            <div className='col-span-2'>Thành tiền</div>
          </div>
          {row.map((item: any, index: number) => (
            <div key={index}>
              <RowSelectProduct index={index} isStockForm={false} />
            </div>
          ))}
        </div>
        <div className='flex items-start justify-between mt-10'>
          <Button variant={'outline'} onClick={handleButtonAddRow}>
            Thêm sản phẩm
          </Button>
          <div>
            <h3 className='font-bold text-2xl'>
              Tổng tiền: <span>{formatPrice(calcTotalPrice())}</span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
