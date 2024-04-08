'use client';
import { DialogContent, DialogHeader, DialogTitle, Dialog } from '@/components/ui/dialog';
import { Category } from '@/types/categoryType';
import { Product, ProductImagesType } from '@/types/productType';
import Image from 'next/image';

type ModalProps = {
  product: Product;
  isOpen: boolean;
  setOpen: any;
};

export default function ProductModal({ product, isOpen, setOpen }: ModalProps) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle className='text-2xl uppercase pb-4'>Thông tin sản phẩm</DialogTitle>
            <div className='py-4'>
              <div className='mb-3 space-y-3'>
                <h4 className='font-bold'>Ảnh sản phẩm:</h4>
                {product?.images.length > 0 && (
                  <div className='flex gap-x-4'>
                    {product?.images.map((item: ProductImagesType, index: number) => (
                      <div key={index} className='relative w-[100px] h-[100px]'>
                        <img src={'/' + item.name} className='absolute object-cover top-0 left-0 h-full' alt={item.name} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className='flex items-center gap-x-2 mb-3'>
                <h4 className='font-bold'>Tên sản phẩm:</h4>
                <p>{product?.name}</p>
              </div>
              <div className='flex items-center gap-x-2 mb-3'>
                <h4 className='font-bold'>Số lượng:</h4>
                <p>{product?.quantity}</p>
              </div>
              <div className='flex items-center gap-x-2 mb-3'>
                <h4 className='font-bold'>Giá nhập:</h4>
                <p>{product?.importPrice}</p>
              </div>
              <div className='flex items-center gap-x-2 mb-3'>
                <h4 className='font-bold'>Đơn giá:</h4>
                <p>{product?.price}</p>
              </div>
              <div className='flex items-center gap-x-2 mb-3'>
                <h4 className='font-bold'>Mô tả:</h4>
                <p>{product?.description}</p>
              </div>
              <div className='flex items-center gap-x-2 mb-3'>
                <h4 className='font-bold'>Nhóm sản phẩm:</h4>
                <p>
                  {product?.categories.map((category: Category, index: number) => {
                    return (
                      <span key={index}>
                        {category.name} {index !== product.categories.length - 1 && ','}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
