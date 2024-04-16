'use client';
import { useAuth } from '@/contexts/auth/AuthContext';
import { NavItem } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CASHIER_PATH } from '@/constants/url';
import { ROLE_CASHIER } from '@/constants/roles';

interface ISidebarItemProps {
  items: NavItem[];
}

export default function SidebarItems({ items }: ISidebarItemProps) {
  const path = usePathname();
  const { roles } = useAuth();

  const checkRolesCashier = (pathName: string) => {
    return roles && roles.length == 1 && roles.includes(ROLE_CASHIER) && !CASHIER_PATH.includes(pathName);
  };

  return (
    <nav className='grid items-start gap-2'>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          item.href &&
          !checkRolesCashier(item.href) && (
            <Link key={index} href={item.href} className={`${checkRolesCashier(item.href) && 'pointer-events-none'}`}>
              <span
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                  path === item.href ? 'bg-accent' : 'transparent'
                }`}>
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
