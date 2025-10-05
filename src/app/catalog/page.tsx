import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { catalogApi } from '@/shared/api/catalog.api';
import { API_PATHS } from '@/shared/config/site.config';
import { CatalogView } from '@/views/catalog-view/catalog-view';

export default async function CatalogMainPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['catalog', API_PATHS.CATALOG],
    queryFn: () => catalogApi.get(API_PATHS.CATALOG),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogView />
    </HydrationBoundary>
  );
}
