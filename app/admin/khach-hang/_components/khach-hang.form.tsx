'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UserSchemaType, UserSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Customer } from '@/types/index';
import Link from 'next/link';
import { create, edit } from '@/api/customer';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { URL_SHOW_CUSTOMER } from '@/constants/url';
import ImageNotFound from '@/components/image-404';

type FormPropsType = {
  initCustomer?: Customer | null;
};

export default function CustomerForm({ initCustomer }: FormPropsType) {
  const { toast } = useToast();
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initCustomer?.avatar || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: initCustomer?.name ?? '',
      avatar: initCustomer?.avatar ?? '',
      email: initCustomer?.email ?? '',
      phone: initCustomer?.phone ?? '',
      address: initCustomer?.address ?? '',
    },
  });

  const handleAvatarChange = (e: any) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setAvatarPreview(result);
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  // const handleDeleteImagesPreview = (index: number) => {
  //   const newImages = [...imagesPreview];
  //   newImages.splice(index, 1);
  //   setImagesPreview(newImages);
  //   if (inputRef.current) {
  //     inputRef.current.value = '';
  //   }
  // };

  const onSubmit = async (data: UserSchemaType) => {
    data.avatar = avatarPreview;

    // try {
    //   if (initCustomer) {
    //     const res = await edit(initCustomer.id, data);
    //     toast({
    //       description: 'Cập nhật khách hàng thành công',
    //     });
    //   } else {
    //     const res = await create(data);
    //     if (res?.id) {
    //       toast({
    //         description: 'Thêm khách hàng thành công',
    //       });
    //     }
    //   }
    //   router.refresh();
    //   router.push(URL_SHOW_CUSTOMER);
    // } catch (error) {
    //   console.log(error);
    //   toast({
    //     description: 'Thêm khách hàng thất bại',
    //   });
    // }
  };

  return (
    <>
      <div className='mt-10 space-y-4'>
        <div className='relative w-[200px] h-[200px]'>
          {avatarPreview ? (
            <Image src={avatarPreview} fill className='absolute object-cover top-0 left-0 h-full' priority sizes='(max-width: 200px)' alt='...' />
          ) : (
            <ImageNotFound />
          )}
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
                name='avatar'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh đại diện:</FormLabel>
                    <FormControl>
                      <Input type='file' onChange={handleAvatarChange} ref={inputRef} accept='image/*' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại:</FormLabel>
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
                      <Textarea {...field} />
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
