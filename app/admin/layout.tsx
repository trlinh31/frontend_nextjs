import type { Metadata } from 'next';
import Header from '@/components/layouts/header';
import Sidebar from '@/components/layouts/sidebar';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { ThemeProvider } from '@/components/layouts/ThemeToggle/theme-provider';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <Header />
        <div className='flex'>
          <AuthProvider>
            <Sidebar />
            <main className='w-full pt-16 ml-72'>
              <div className='p-4'>{children}</div>
            </main>
          </AuthProvider>
        </div>
      </ThemeProvider>
    </>
  );
}
