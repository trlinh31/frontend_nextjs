'use client';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Product } from '@/types/product.type';
import { formatPrice } from '@/utils/formatPrice';
import { useCartStore } from '@/zustand/store';
import { X } from 'lucide-react';
import Cookies from 'js-cookie';
import { useToast } from '@/components/ui/use-toast';
import { decodeToken } from '@/utils/sessionToken';
import { createTransaction } from '@/api/transaction';

type propsType = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CartComponent({ isOpen, setOpen }: propsType) {
  const cart = useCartStore();
  const { toast } = useToast();
  const tokenUser = Cookies.get('accessToken') ?? null;

  const handleRemoveProductFromCart = (id: string) => {
    cart.removeItem(id);
  };

  const handleSubmit = async () => {
    if (!tokenUser) {
      toast({
        variant: 'destructive',
        description: 'Vui lòng đăng nhập để hoàn thành đơn hàng',
      });
      return;
    }
    const tokenDecode = decodeToken(tokenUser!!);
    if (tokenDecode) {
      const data = {
        customer: {
          username: tokenDecode.sub,
        },
        name: 'test',
        email: 'test@gmail.com',
        address: 'Hà Nội',
        transactionDetails: cart.items.map((item) => ({
          product: { id: item.product.id },
          quantity: item.quantity,
        })),
      };
      const res = await createTransaction(data);
      if (res === 200) {
        cart.removeAllItem();
        toast({
          description: 'Đơn hàng đang chờ được xác nhận',
        });
      }
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent style={{ minWidth: '30vw' }}>
          <SheetHeader>
            <SheetTitle>Giỏ Hàng</SheetTitle>
          </SheetHeader>
          <div className='h-[500px] max-h-[500px] overflow-y-auto'>
            <ul className='flex flex-col gap-y-6 mt-6'>
              {cart.items.length > 0 &&
                cart.items.map((item: { product: Product; quantity: number }) => (
                  <li key={item.product.id}>
                    <div className='grid grid-cols-12 gap-x-2'>
                      <div className='col-span-3'>
                        <img src={item.product.images[0].name} width={100} height={100} className='object-cover object-top' alt={item.product.name} />
                      </div>
                      <div className='col-span-8'>
                        <h3 className='mt-1 text-sm font-semibold text-neutral-900 line-clamp-1'>{item.product.name}</h3>
                        <h3 className='mt-1 text-sm font-semibold text-neutral-500 line-clamp-1'>x{item.quantity}</h3>
                        <h3 className='mt-1 text-sm font-semibold text-neutral-900 line-clamp-1'>
                          <span>Thành tiền:</span> {formatPrice(item.product.price * item.quantity)}
                        </h3>
                      </div>
                      <div className='col-span-1 pt-1'>
                        <button onClick={() => handleRemoveProductFromCart(item.product.id)}>
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className='border-t mt-4 pt-3 flex flex-col justify-between'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-semibold text-neutral-900'>Tổng tiền:</h3>
              <h3 className='text-xl font-semibold text-neutral-900'>{formatPrice(cart.getTotalPrice())}</h3>
            </div>
            <div className='grid pt-4'>
              <Button onClick={handleSubmit}>Đặt hàng</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
