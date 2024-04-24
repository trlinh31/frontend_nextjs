import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vai trò',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
