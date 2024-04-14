'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RoleSchemaType, RoleSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { URL_SHOW_ROLE } from '@/constants/url';
import { Role } from '@/types/role.type';
import { createOrUpdateRole } from '@/api/role';

type FormPropsType = {
  initRole?: Role | null;
};

export default function RoleForm({ initRole }: FormPropsType) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<RoleSchemaType>({
    resolver: zodResolver(RoleSchema),
    defaultValues: {
      id: initRole?.id.toString() ?? '',
      name: initRole?.name ?? '',
    },
  });

  const onSubmit = async (formData: RoleSchemaType) => {
    const successMessage = initRole ? 'Cập nhật vai trò thành công' : 'Thêm mới vai trò thành công';
    try {
      const res = await createOrUpdateRole(formData);
      if (res === 200) {
        toast({ description: successMessage });
        router.refresh();
        router.push(URL_SHOW_ROLE);
      }
    } catch {
      toast({ description: 'Thêm vai trò thất bại' });
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên vai trò:</FormLabel>
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
                <Link href={URL_SHOW_ROLE}>Huỷ</Link>
              </Button>
              <Button type='submit'>Lưu</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
