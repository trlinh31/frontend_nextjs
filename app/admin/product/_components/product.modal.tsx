'use client';
import { DialogContent, DialogHeader, DialogTitle, Dialog } from '@/components/ui/dialog';
import { Category } from '@/types/category.type';
import { Product, ProductImagesType } from '@/types/product.type';
import { formatPrice } from '@/utils/formatPrice';

type ModalProps = {
  product: Product;
  isOpen: boolean;
  setOpen: any;
};

export default function ProductModal({ product, isOpen, setOpen }: ModalProps) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[600px] bg-gray-200 p-8 h-[80vh] overflow-y-auto'>
          {product?.images.length > 0 && (
            <div className='grid grid-cols-5 h-[160px] bg-white p-4'>
              {product?.images.map((item: ProductImagesType, index: number) => (
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
                <h3 className='font-bold text-gray-700'>{product?.code}</h3>
              </div>
              <div className='flex flex-col bg-white p-4'>
                <p className='text-gray-400 font-bold text-sm'>Tên sản phẩm</p>
                <h3 className='font-bold text-gray-700'>{product?.name}</h3>
              </div>
              <div className='flex flex-col bg-white p-4'>
                <p className='text-gray-400 font-bold text-sm'>Số lượng</p>
                <h3 className='font-bold text-gray-700'>{product?.quantity}</h3>
              </div>
              <div className='flex flex-col bg-white p-4'>
                <p className='text-gray-400 font-bold text-sm'>Danh mục sản phẩm</p>
                <h3 className='font-bold text-gray-700'>
                  {product?.categories.map((category: Category, index: number) => {
                    return (
                      <span key={index}>
                        {category.name} {index !== product.categories.length - 1 && ','}
                      </span>
                    );
                  })}
                </h3>
              </div>
              <div className='flex flex-col bg-white p-4'>
                <p className='text-gray-400 font-bold text-sm'>Giá nhập</p>
                <h3 className='font-bold text-gray-700'>{formatPrice(product?.importPrice)}</h3>
              </div>
              <div className='flex flex-col bg-white p-4'>
                <p className='text-gray-400 font-bold text-sm'>Giá bán</p>
                <h3 className='font-bold text-gray-700'>{formatPrice(product?.price)}</h3>
              </div>

              <div className='flex flex-col col-span-2 bg-white p-4'>
                <p className='text-gray-400 font-bold text-sm'>Mô tả</p>
                <h3 className='font-bold text-gray-700'>{product?.description}</h3>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
