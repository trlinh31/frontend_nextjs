import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khách hàng',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
