import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Phiếu nhập hàng',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
