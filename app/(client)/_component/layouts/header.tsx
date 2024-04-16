'use client';
import Link from 'next/link';
import { ShoppingBag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartComponent from '@/components/cart';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  const handleOpenViewCart = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <header className='sticky top-0 z-20 bg-neutral-100/50 backdrop-blur-md'>
        <div className='container w-[1366px]'>
          <nav className='flex items-center justify-between h-[60px]'>
            <Link href={'/'} className='font-bold text-2xl text-orange-500'>
              Keysoft
            </Link>
            <div>
              <Button variant={'link'}>
                <User color='black' />
              </Button>
              <Button variant={'link'} onClick={handleOpenViewCart}>
                <ShoppingBag color='black' />
              </Button>
            </div>
          </nav>
        </div>
      </header>
      <CartComponent isOpen={isOpen} setOpen={setOpen} />
    </>
  );
}
