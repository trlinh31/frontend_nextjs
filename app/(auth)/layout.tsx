export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className='flex items-center justify-center w-screen h-screen bg-gray-900'>{children}</main>
    </>
  );
}
