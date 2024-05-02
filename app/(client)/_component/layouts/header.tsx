'use client';
import Link from 'next/link';
import { ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartComponent from '@/components/cart';
import { useState } from 'react';
import ClientNav from '@/app/(client)/_component/layouts/client-nav';

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const handleOpenViewCart = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <header className='sticky top-0 z-20 bg-neutral-100/50 backdrop-blur-md'>
        <div className='container w-[1366px] max-w-full'>
          <nav className='flex items-center justify-between h-[60px]'>
            <Link href={'/'} className='font-bold text-2xl text-orange-500'>
              Keysoft
            </Link>
            <div>
              <Link href={'/orders'}>Lịch sử đơn hàng</Link>
            </div>
            <div className='flex items-center gap-x-4'>
              <ClientNav />
              <button onClick={handleOpenViewCart}>
                <ShoppingBag color='black' />
              </button>
            </div>
          </nav>
        </div>
      </header>
      <CartComponent isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}
