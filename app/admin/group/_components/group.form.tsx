'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { GroupSchemaType, GroupSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { URL_SHOW_GROUP } from '@/constants/url';
import { Role } from '@/types/role.type';
import { Group } from '@/types/group.type';
import { Checkbox } from '@/components/ui/checkbox';
import { createOrUpdateGroup } from '@/api/group';

type FormPropsType = {
  initGroup?: Group | null;
  roles: Role[] | [];
};

export default function GroupForm({ initGroup, roles }: FormPropsType) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<GroupSchemaType>({
    resolver: zodResolver(GroupSchema),
    defaultValues: {
      id: initGroup?.id.toString() ?? '',
      name: initGroup?.name ?? '',
      roles: initGroup?.roles.map((item) => +item.id) ?? [],
    },
  });

  const onSubmit = async (formData: GroupSchemaType) => {
    const successMessage = initGroup ? 'Cập nhật nhóm tài khoản thành công' : 'Thêm mới nhóm tài khoản thành công';
    formData.roles = formData.roles.map((id) => ({ id }));

    try {
      const res = await createOrUpdateGroup(formData);
      if (res === 200) {
        toast({ description: successMessage });
        router.refresh();
        router.push(URL_SHOW_GROUP);
      }
    } catch {
      toast({ description: 'Thêm nhóm tài khoản thất bại' });
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
                    <FormLabel>Tên nhóm:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='roles'
                render={() => (
                  <FormItem className='col-span-2'>
                    <div className='mb-4'>
                      <FormLabel className='text-base'>Nhóm vai trò:</FormLabel>
                    </div>
                    <div className='flex items-center gap-x-3'>
                      {roles?.map((item: Role) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name='roles'
                          render={({ field }) => {
                            return (
                              <FormItem key={item.id} className='flex flex-row items-start space-x-3 space-y-0'>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(+item.id)}
                                    onCheckedChange={(checked: any) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(field.value?.filter((value) => value !== +item.id));
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className='text-sm font-normal'>{item.name}</FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='space-x-3'>
              <Button type='button' variant='secondary' asChild>
                <Link href={URL_SHOW_GROUP}>Huỷ</Link>
              </Button>
              <Button type='submit'>Lưu</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
