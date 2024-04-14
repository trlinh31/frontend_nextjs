import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sản phẩm',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
