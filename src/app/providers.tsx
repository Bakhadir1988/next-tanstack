import QueryProvider from '@/shared/lib/query-provider';

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <QueryProvider>{children}</QueryProvider>;
}
