import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nhóm tài khoản',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
