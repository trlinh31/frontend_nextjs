import AuthGuard from '@/components/layouts/guard';
import Header from '@/components/layouts/header';
import Sidebar from '@/components/layouts/sidebar';
import { AuthProvider } from '@/contexts/auth/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className='flex'>
        <Sidebar />
        <main className='w-full pt-16 ml-72'>
          <div className='p-4'>
            <AuthProvider>
              <AuthGuard>{children}</AuthGuard>
            </AuthProvider>
          </div>
        </main>
      </div>
    </>
  );
}
