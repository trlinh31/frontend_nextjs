'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ProductSchemaType, ProductSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Product } from '@/types/product.type';
import Link from 'next/link';
import { createOrUpdateProduct } from '@/api/product';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { URL_SHOW_PRODUCT } from '@/constants/url';
import { Category } from '@/types/category.type';
import { Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import TreeCheckbox from '@/components/tree-checkbox';

type FormPropsType = {
  initProduct?: Product | null;
  categories: Category[] | null;
};

export default function ProductForm({ initProduct, categories }: FormPropsType) {
  const { toast } = useToast();
  const router = useRouter();
  const initialCategories = initProduct?.categories.map((item) => item.id.toString());
  const [dataCheckbox, setDataCheckbox] = useState<string[]>(initialCategories || []);
  const [images, setImages] = useState<any>(initProduct?.images || []);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageErrors, setImageErrors] = useState<boolean[]>(initProduct?.images?.map(() => false) || []);

  const handleImageError = (index: number) => {
    const updatedErrors = [...imageErrors];
    updatedErrors[index] = true;
    setImageErrors(updatedErrors);
  };

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: initProduct?.id.toString() ?? '',
      name: initProduct?.name ?? '',
      description: initProduct?.description ?? '',
      importPrice: initProduct?.importPrice ?? 0,
      price: initProduct?.price ?? 0,
      quantity: initProduct?.quantity ?? 0,
      images: images,
      productCategories: initProduct?.categories.map((item) => item.id.toString()) ?? [],
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: { name: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64 = reader.result?.toString() || '';
        newImages.push({ name: base64 });
        if (newImages.length === files.length) {
          setImages([...images, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const onSubmit = async (data: ProductSchemaType) => {
    const successMessage = initProduct ? 'Cập nhật sản phẩm thành công' : 'Thêm mới sản phẩm thành công';
    if (!initProduct) {
      data.images = images;
    }

    if (initProduct) {
      if (images.length > 0) {
        data.images = images;
      }
    }

    if (dataCheckbox.length > 0) {
      data.productCategories = dataCheckbox;
    }

    const res = await createOrUpdateProduct(data);
    if (res !== 200) {
      toast({ description: 'Thêm sản phẩm thất bại' });
      return;
    }
    toast({ description: successMessage });
    router.push(URL_SHOW_PRODUCT);
  };

  const checkUrlImage = (url: string) => {
    return url.includes('base64');
  };

  return (
    <>
      <div className='mt-10 space-y-4'>
        <div className='flex gap-x-4'>
          {images.map(
            (item: any, index: number) =>
              !imageErrors[index] && (
                <div key={index} className='relative w-[200px] h-[200px]'>
                  <img
                    src={`${checkUrlImage(item.name) ? item.name : '/' + item.name}`}
                    className='absolute object-cover top-0 left-0 w-full h-full'
                    alt={item.name}
                    onError={() => handleImageError(index)}
                  />
                  <Button variant={'destructive'} className='absolute top-1 right-1' size={'icon'} onClick={() => handleDeleteImage(index)}>
                    <Trash2 />
                  </Button>
                </div>
              )
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
                name='images'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh sản phẩm:</FormLabel>
                    <FormControl>
                      <Input type='file' onChange={handleImageChange} ref={inputRef} accept='image/*' multiple />
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
                    <FormLabel>Tên sản phẩm:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='importPrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá nhập:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='price'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Đơn giá:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Mô tả:</FormLabel>
                    <FormControl>
                      <Textarea {...field} className='resize-none' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TreeCheckbox initialData={categories} dataCheckbox={dataCheckbox} setDataCheckbox={setDataCheckbox} />
            </div>
            <div className='space-x-3'>
              <Button type='button' variant='secondary' asChild>
                <Link href={URL_SHOW_PRODUCT}>Huỷ</Link>
              </Button>
              <Button type='submit'>Lưu</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
