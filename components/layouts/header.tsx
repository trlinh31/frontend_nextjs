import { outOfStock } from '@/api/product';
import { ThemeToggle } from '@/components/layouts/ThemeToggle/theme-toggle';
import Notification from '@/components/layouts/notification';
import UserNav from '@/components/layouts/user-nav';
import { decodeToken } from '@/utils/sessionToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Header() {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get('accessToken')?.value as string;
  if (!accessToken) {
    redirect('/login');
  }
  const user = await decodeToken(accessToken);

  let products = [];
  // const { data } = await outOfStock();
  // products = data && [...data];

  return (
    <div className='fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20'>
      <nav className='h-14 flex items-center justify-end px-4 gap-x-10'>
        {/* <Notification products={data} /> */}
        <UserNav user={user} />
        <ThemeToggle />
      </nav>
    </div>
  );
}
