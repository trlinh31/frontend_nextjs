'use client';
import SidebarItems from '@/components/sidebar-item';
import { navItems } from '@/constants/data';
import { useAuthStore } from '@/zustand/store';

export default function Sidebar() {
  const auth = useAuthStore();
  return (
    <div className='fixed top-0 left-0 h-screen blur-0 border-r pt-16 w-72'>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='space-y-1'>
            <SidebarItems items={navItems} roles={auth.roles} />
          </div>
        </div>
      </div>
    </div>
  );
}
