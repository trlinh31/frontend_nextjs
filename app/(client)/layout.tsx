import Header from '@/app/(client)/_component/layouts/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lịch sử đơn hàng',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
