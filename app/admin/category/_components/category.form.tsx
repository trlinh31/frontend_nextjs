'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CategorySchemaType, CategorySchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { URL_SHOW_CATEGORY } from '@/constants/url';
import { Category } from '@/types/category.type';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createOrUpdateCategory } from '@/api/category';

type FormPropsType = {
  initCategory?: Category | null;
  parentsCategory: Category[] | null;
};

export default function CategoryForm({ initCategory, parentsCategory }: FormPropsType) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      id: initCategory?.id.toString() ?? '',
      name: initCategory?.name ?? '',
      parentsId: initCategory?.parentsId?.toString() ?? '',
    },
  });

  const onSubmit = async (formData: CategorySchemaType) => {
    const successMessage = initCategory ? 'Cập nhật danh mục thành công' : 'Thêm mới danh mục thành công';
    const res = await createOrUpdateCategory(formData);
    if (res !== 200) {
      toast({ description: 'Thêm danh mục thất bại' });
      return;
    }
    toast({ description: successMessage });
    router.push(URL_SHOW_CATEGORY);
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
                    <FormLabel>Tên danh mục:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='parentsId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục cha:</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Chọn danh mục cha' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {parentsCategory?.map((item) => (
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
                <Link href={URL_SHOW_CATEGORY}>Huỷ</Link>
              </Button>
              <Button type='submit'>Lưu</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
