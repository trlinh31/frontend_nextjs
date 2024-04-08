'use client';
import SidebarItems from '@/components/sidebar-item';
import { navItems } from '@/constants/data';

export default function Sidebar() {
  return (
    <div className='fixed top-0 left-0 h-screen blur-0 border-r pt-16 w-72'>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='space-y-1'>
            <SidebarItems items={navItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
