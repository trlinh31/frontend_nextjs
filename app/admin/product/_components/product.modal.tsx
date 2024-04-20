'use client';
import StarRating from '@/components/star-rating';
import { DialogContent, Dialog } from '@/components/ui/dialog';
import { Category } from '@/types/category.type';
import { ProductImagesType } from '@/types/product.type';
import { formatPrice } from '@/utils/formatPrice';

type ModalProps = {
  data: any;
  isOpen: boolean;
  setOpen: any;
  type: string;
};

export default function ProductModal({ data, isOpen, setOpen, type }: ModalProps) {
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
                {data?.map((item: any) => (
                  <li key={item.id} className='bg-white p-3 rounded-xl'>
                    <p className='text-sm text-neutral-500'>{item.customer.username}</p>
                    <StarRating rating={item.rating} />
                    <p>{item.comment}</p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
