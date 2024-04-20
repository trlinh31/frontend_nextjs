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

export default function TransactionForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [row, setRow] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [customer, setCustomer] = useState<Customer | undefined>();

  useEffect(() => {
    const totalInvoice = transactions?.reduce((total: number, item: any) => {
      return total + item.total;
    }, 0);
    setTotal(totalInvoice);
  }, [transactions]);

  const handleTransitonsChange = (productId: string, quantity: number, total: number) => {
    const updatedStock = [...transactions];
    const existingItem = updatedStock.find((item: any) => item.product.id === productId);
    if (!existingItem) {
      setTransactions((prevTransaction: any) => [
        ...prevTransaction,
        {
          product: {
            id: productId,
          },
          quantity: quantity,
          total: total,
        },
      ]);
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

  const onSubmit = async (data: TransactionSchemaType) => {
    if (transactions.length > 0) {
      data.transactionDetails = transactions;
      const successMessage = 'Tạo đơn hàng thành công';
      const res = await createTransaction(data);
      if (res === 200) {
        toast({ description: successMessage });
        router.refresh();
        router.push(URL_SHOW_TRANSACTION);
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
      <div className='flex items-start justify-between mt-10'>
        <Button variant={'outline'} onClick={handleButtonAddRow}>
          Thêm sản phẩm
        </Button>
        <div className='space-y-4'>
          <div className='flex items-center justify-between gap-x-20'>
            <p className='font-semibold'>Tổng cộng:</p>
            <p>{formatPrice(total)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
