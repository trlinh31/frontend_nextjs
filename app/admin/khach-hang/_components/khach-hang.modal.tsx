'use client';
import { DialogContent, DialogHeader, DialogTitle, Dialog } from '@/components/ui/dialog';
import { Product } from '@/types';
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
                    {product?.images.map((item: string, index: number) => (
                      <div key={index} className='relative w-[100px] h-[100px]'>
                        <Image src={item} fill className='absolute object-cover top-0 left-0 h-full' priority sizes='(max-width: 200px)' alt='...' />
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
                <h4 className='font-bold'>Đơn giá:</h4>
                <p>{product?.price}</p>
              </div>
              <div className='flex items-center gap-x-2 mb-3'>
                <h4 className='font-bold'>Nhà cung cấp:</h4>
                <p>{product?.supplier}</p>
              </div>
              <div className='flex items-center gap-x-2 mb-3'>
                <h4 className='font-bold'>Mô tả:</h4>
                <p>{product?.description}</p>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
