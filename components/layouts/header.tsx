'use client';
import { ThemeToggle } from '@/components/layouts/ThemeToggle/theme-toggle';
import UserNav from '@/components/layouts/user-nav';

export default function Header() {
  return (
    <div className='fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20'>
      <nav className='h-14 flex items-center justify-end px-4 space-x-8'>
        <UserNav />
        <ThemeToggle />
      </nav>
    </div>
  );
}
