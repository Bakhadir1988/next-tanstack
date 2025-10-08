import { ProductListProvider } from '@/entities/product/model/product-list-provider';
import QueryProvider from '@/shared/lib/query-provider';
import { SessionProvider } from '@/shared/lib/session-provider';

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <SessionProvider>
        <ProductListProvider>{children}</ProductListProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
