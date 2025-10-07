import QueryProvider from '@/shared/lib/query-provider';
import { SessionProvider } from '@/shared/lib/session-provider';

export function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <SessionProvider>{children}</SessionProvider>
    </QueryProvider>
  );
}
