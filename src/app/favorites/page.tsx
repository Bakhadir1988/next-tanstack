import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

import { favoritesApi, ListResponse } from '@/shared/api/list.api';
import { FavoritesView } from '@/views/catalog-view/favorites/favorites';

export default async function FavoritesPage() {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;

  const initialData = sessionId
    ? await queryClient.fetchQuery<ListResponse | string>({
        queryKey: ['favorites', sessionId],
        queryFn: () => favoritesApi.get(sessionId),
      })
    : { items: [] };

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FavoritesView sessionId={sessionId} initialData={initialData} />
    </HydrationBoundary>
  );
}
