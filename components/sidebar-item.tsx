'use client';
import { NavItem } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ISidebarItemProps {
  items: NavItem[];
}

export default function SidebarItems({ items }: ISidebarItemProps) {
  const path = usePathname();

  return (
    <nav className='grid items-start gap-2'>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          item.href && (
            <Link key={index} href={item.href} className={`${item.disabled && 'pointer-events-none'}`}>
              <span
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                  item.disabled && 'cursor-not-allowed opacity-10 select-none'
                } ${path === item.href ? 'bg-accent' : 'transparent'}`}>
                <Icon className='mr-1 h-4 w-8' />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
