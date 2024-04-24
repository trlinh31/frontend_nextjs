import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/types/product.type';
import { formatPrice } from '@/utils/formatPrice';
import { useCartStore } from '@/zustand/store';
import NextImage from 'next/image';

export default function ProductItem({ product }: { product: Product }) {
  const cart = useCartStore();
  const { toast } = useToast();

  const handleAddProductToCart = (product: Product) => {
    cart.addItem(product);
    toast({
      description: 'Thêm sản phẩm vào giỏ hàng thành công',
    });
  };

  return (
    <>
      <div>
        <div className='aspect-square overflow-hidden'>
          <NextImage
            src={'/' + product.images[0]?.name}
            alt={product.name}
            width={512}
            height={512}
            sizes={'512px'}
            priority={true}
            className='h-full w-full object-cover object-top'
          />
        </div>
        <div className='mt-2'>
          <div className='flex justify-between'>
            <div>
              <h3 className='mt-1 text-sm font-semibold text-neutral-900 line-clamp-1'>{product.name}</h3>
              <p className='mt-1 text-sm font-semibold text-neutral-500'>{product.categories[0].name}</p>
            </div>
            <h3 className='mt-1 text-sm font-semibold text-neutral-900'>{formatPrice(product.price)}</h3>
          </div>
          <div className='grid mt-2'>
            <Button
              variant={product.quantity === 0 ? 'destructive' : 'default'}
              onClick={() => handleAddProductToCart(product)}
              disabled={product.quantity === 0}
              className='uppercase'>
              {product.quantity === 0 ? 'Hết hàng' : 'Mua ngay'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
