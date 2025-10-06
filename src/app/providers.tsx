import { FavoritesProvider } from '@/entities/favorite/context/favorites-provider';
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
        <FavoritesProvider>{children}</FavoritesProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
