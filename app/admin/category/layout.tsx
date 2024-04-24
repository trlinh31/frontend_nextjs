import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danh mục sản phẩm',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
