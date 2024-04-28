'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UserSchemaType, UserSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { URL_SHOW_USER } from '@/constants/url';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types/user.type';
import { Group } from '@/types/group.type';
import { createOrUpdateUser } from '@/api/user';

type FormPropsType = {
  initUser?: User | null;
  groups: Group[] | [];
};

export default function UserForm({ initUser, groups }: FormPropsType) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      id: initUser?.id.toString() ?? '',
      fullName: initUser?.fullName ?? '',
      username: initUser?.username ?? '',
      password: initUser?.password ?? '',
      email: initUser?.email ?? '',
      address: initUser?.address ?? '',
      group: {
        id: initUser?.group?.id.toString() ?? '',
      },
    },
  });

  const onSubmit = async (data: UserSchemaType) => {
    const successMessage = initUser ? 'Cập nhật tài khoản thành công' : 'Thêm mới tài khoản thành công';
    const res = await createOrUpdateUser(data);
    if (res !== 200) {
      toast({ variant: 'destructive', description: 'Thêm tài khoản thất bại' });
      return;
    }
    toast({ description: successMessage });
    router.push(URL_SHOW_USER);
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
                    <FormLabel>Họ và tên:</FormLabel>
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
                      <Input type='password' {...field} disabled={initUser ? true : false} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='group.id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhóm tài khoản:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn nhóm tài khoản' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {groups?.map((item) => (
                          <SelectItem key={item.id.toString()} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='space-x-3'>
              <Button type='button' variant='secondary' asChild>
                <Link href={URL_SHOW_USER}>Huỷ</Link>
              </Button>
              <Button type='submit'>Lưu</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
