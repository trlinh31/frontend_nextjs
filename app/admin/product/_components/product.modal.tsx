'use client';
import { deleteProduct } from '@/api/product';
import ConfirmDialog from '@/components/alert-dialog';
import StarRating from '@/components/star-rating';
import { Button } from '@/components/ui/button';
import { DialogContent, Dialog, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Category } from '@/types/category.type';
import { ProductImagesType } from '@/types/product.type';
import { formatDate } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';
import { useState } from 'react';

type ModalProps = {
  data: any;
  isOpen: boolean;
  setOpen: any;
  type: string;
};

export default function ProductModal({ data, isOpen, setOpen, type }: ModalProps) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const { toast } = useToast();

  const handleDeleteProduct = async () => {
    const res = await deleteProduct(data.id);
    if (res !== 200) {
      toast({
        variant: 'destructive',
        description: 'Xoá sản phẩm thất bại',
      });
      return;
    }
    toast({
      description: 'Xoá sản phẩm thành công',
    });
    setOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[600px] bg-neutral-200 p-8 h-[80vh] overflow-y-auto'>
          {type === 'detail' ? (
            <>
              {data?.images && (
                <div className='grid grid-cols-5 h-[160px] bg-white p-4'>
                  {data?.images.map((item: ProductImagesType, index: number) => (
                    <div key={index} className='relative w-[100px] h-full'>
                      <img src={'/' + item.name} className='absolute object-cover top-0 left-0 h-full' alt={item.name} />
                    </div>
                  ))}
                </div>
              )}
              <div className='space-y-4'>
                <div className='grid grid-cols-2 gap-1'>
                  <div className='flex flex-col bg-white p-4'>
                    <p className='text-gray-400 font-bold text-sm'>Mã sản phẩm</p>
                    <h3 className='font-bold text-gray-700'>{data?.code}</h3>
                  </div>
                  <div className='flex flex-col bg-white p-4'>
                    <p className='text-gray-400 font-bold text-sm'>Tên sản phẩm</p>
                    <h3 className='font-bold text-gray-700'>{data?.name}</h3>
                  </div>
                  <div className='flex flex-col bg-white p-4'>
                    <p className='text-gray-400 font-bold text-sm'>Số lượng</p>
                    <h3 className='font-bold text-gray-700'>{data?.quantity}</h3>
                  </div>
                  <div className='flex flex-col bg-white p-4'>
                    <p className='text-gray-400 font-bold text-sm'>Danh mục sản phẩm</p>
                    <h3 className='font-bold text-gray-700'>
                      {data?.categories.map((category: Category, index: number) => {
                        return (
                          <span key={index}>
                            {category.name} {index !== data.categories.length - 1 && ','}
                          </span>
                        );
                      })}
                    </h3>
                  </div>
                  <div className='flex flex-col bg-white p-4'>
                    <p className='text-gray-400 font-bold text-sm'>Giá nhập</p>
                    <h3 className='font-bold text-gray-700'>{formatPrice(data?.importPrice)}</h3>
                  </div>
                  <div className='flex flex-col bg-white p-4'>
                    <p className='text-gray-400 font-bold text-sm'>Giá bán</p>
                    <h3 className='font-bold text-gray-700'>{formatPrice(data?.price)}</h3>
                  </div>

                  <div className='flex flex-col col-span-2 bg-white p-4'>
                    <p className='text-gray-400 font-bold text-sm'>Mô tả</p>
                    <h3 className='font-bold text-gray-700'>{data?.description}</h3>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <ul className='space-y-3'>
                {data.length > 0 ? (
                  data?.map((item: any) => (
                    <li key={item.id} className='bg-white p-3 rounded-xl'>
                      <p className='text-sm text-neutral-500'>
                        {item.customer.username} | {formatDate(item.createdDate)}
                      </p>
                      <StarRating rating={item.rating} />
                      <p className='text-xl'>{item.comment}</p>
                    </li>
                  ))
                ) : (
                  <p className='text-center font-bold text-xl'>Chưa có đánh giá</p>
                )}
              </ul>
            </>
          )}
          {type === 'detail' && (
            <DialogFooter>
              <Button variant={'outline'} onClick={() => setIsOpenDelete(true)}>
                Xoá sản phẩm
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
      {isOpenDelete && (
        <ConfirmDialog
          message='Bạn có muốn xoá sản phẩm'
          isOpenConfirm={isOpenDelete}
          setIsOpenConfirm={setIsOpenDelete}
          onConfirm={handleDeleteProduct}
        />
      )}
    </>
  );
}
