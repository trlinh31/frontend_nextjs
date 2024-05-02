'use client';
import { NavItem } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROLE_CASHIER } from '@/constants/roles';
import { useEffect, useState } from 'react';
import { URL_DASHBOARD } from '@/constants/url';
import { Home } from 'lucide-react';

interface ISidebarItemProps {
  items: NavItem[];
  roles: string[] | undefined;
}

export default function SidebarItems({ items: navItems, roles }: ISidebarItemProps) {
  const [filteredItems, setFilteredItems] = useState<NavItem[]>(navItems);
  const path = usePathname();

  useEffect(() => {
    const cashierItems =
      roles?.length === 1 && roles?.includes(ROLE_CASHIER) ? navItems.filter((item) => item.role?.includes(ROLE_CASHIER)) : navItems;
    setFilteredItems(cashierItems);
  }, [navItems, roles]);

  return (
    <nav className='grid items-start gap-2'>
      <Link href={URL_DASHBOARD}>
        <span
          className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
            path.includes(URL_DASHBOARD) ? 'bg-accent' : 'transparent'
          }`}>
          <Home className='mr-1 h-4 w-8' />
          <span>Dashboard</span>
        </span>
      </Link>
      {filteredItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
              path.includes(item.href) ? 'bg-accent' : 'transparent'
            }`}>
            <item.icon className='mr-1 h-4 w-8' />
            <span>{item.title}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
