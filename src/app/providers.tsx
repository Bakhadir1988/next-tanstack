'use client';

import { HydrationBoundary, type DehydratedState } from '@tanstack/react-query';

import { ProductListProvider } from '@/entities/product/model/product-list-provider';
import QueryProvider from '@/shared/lib/query-provider';
import { SessionProvider } from '@/shared/lib/session-provider';

export function Providers({
  children,
  sessionId,
  dehydratedState,
}: Readonly<{
  children: React.ReactNode;
  sessionId: string;
  dehydratedState: DehydratedState;
}>) {
  return (
    <SessionProvider sessionId={sessionId}>
      <QueryProvider>
        <HydrationBoundary state={dehydratedState}>
          <ProductListProvider>{children}</ProductListProvider>
        </HydrationBoundary>
      </QueryProvider>
    </SessionProvider>
  );
}
