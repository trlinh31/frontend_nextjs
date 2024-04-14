'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CustomerSchemaType, CustomerSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Customer } from '@/types/customer.type';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { URL_SHOW_CUSTOMER } from '@/constants/url';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createOrUpdateCustomer } from '@/api/customer';

type FormPropsType = {
  initCustomer?: Customer | null;
};

export default function CustomerForm({ initCustomer }: FormPropsType) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CustomerSchemaType>({
    resolver: zodResolver(CustomerSchema),
    defaultValues: {
      id: initCustomer?.id.toString() ?? '',
      fullName: initCustomer?.fullName ?? '',
      gender: initCustomer?.gender ?? '',
      email: initCustomer?.email ?? '',
      address: initCustomer?.address ?? '',
      username: initCustomer?.username ?? '',
      password: initCustomer?.password ?? '',
    },
  });

  const onSubmit = async (data: CustomerSchemaType) => {
    const successMessage = initCustomer ? 'Cập nhật khách hàng thành công' : 'Thêm mới khách hàng thành công';
    try {
      const res = await createOrUpdateCustomer(data);
      if (res === 200) {
        toast({ description: successMessage });
        router.refresh();
        router.push(URL_SHOW_CUSTOMER);
      }
    } catch {
      toast({ description: 'Thêm khách hàng thất bại' });
    }
  };

  return (
    <>
      <div className='mt-10 space-y-4'>
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
                name='fullName'
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
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giới tính</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn giới tính' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Nam'>Nam</SelectItem>
                        <SelectItem value='Nữ'>Nữ</SelectItem>
                      </SelectContent>
                    </Select>
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
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu:</FormLabel>
                    <FormControl>
                      <Input type={initCustomer ? 'password' : 'text'} {...field} disabled={initCustomer ? true : false} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='space-x-3'>
              <Button type='button' variant='secondary' asChild>
                <Link href={URL_SHOW_CUSTOMER}>Huỷ</Link>
              </Button>
              <Button type='submit'>Lưu</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
