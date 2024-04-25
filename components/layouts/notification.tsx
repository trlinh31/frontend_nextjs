import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Product } from '@/types/product.type';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Notification({ products }: { products: Product[] }) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild className='relative'>
          <button>
            <Bell />
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-60 p-3'>
          <ScrollArea className='h-[200px]'>
            <ul>
              {products.length > 0 &&
                products.map((product: Product) => (
                  <li className='border-b pb-3 mb-3 pr-3' key={product.id}>
                    <div className='flex items-start'>
                      <Dot className='text-blue-600' />
                      <p className='text-sm leading-relaxed'>
                        Sản phẩm <span className='font-bold'>{product.name}</span> đã hết hàng...
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </ScrollArea>
        </PopoverContent>
        <Badge variant={'destructive'} className='absolute right-[150px] bottom-[27px]'>
          {products.length}
        </Badge>
      </Popover>
    </>
  );
}
