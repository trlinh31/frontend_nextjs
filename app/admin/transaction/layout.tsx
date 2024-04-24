import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giao dịch',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
