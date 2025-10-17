import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import { catalogApi } from '@/shared/api/catalog.api';
import { API_PATHS } from '@/shared/config/site.config';
import { CatalogView, ProductDetailView } from '@/views';

export async function generateStaticParams() {
  try {
    const catalogData = await catalogApi.get(API_PATHS.CATALOG);
    if (!catalogData || !catalogData.sections) {
      return [];
    }
    return catalogData.sections.map((section) => ({
      slug: section.url.split('/').filter(Boolean),
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

export const revalidate = 600;

export default async function CatalogPage(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const queryClient = new QueryClient();
  const slug = params.slug.join('/');

  // 1. Загружаем данные ОДИН раз
  const data = await queryClient.fetchQuery({
    queryKey: ['catalog', `${API_PATHS.CATALOG}${slug}/`],
    queryFn: () => catalogApi.get(`${API_PATHS.CATALOG}${slug}/`),
  });

  // 2. Проверяем на 404
  if (!data) {
    notFound();
  }

  // 3. Определяем тип страницы
  const isSectionPage = data.hasOwnProperty('items');

  // fetchQuery уже положил данные в кеш, поэтому дополнительный prefetch не нужен.
  // Мы просто передаем кеш в HydrationBoundary.

  if (isSectionPage) {
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogView />
      </HydrationBoundary>
    );
  }

  // Если это не страница раздела, значит, это детальная страница товара
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Предполагаем, что CatalogDetailWidget тоже использует useQuery с тем же queryKey */}
      <ProductDetailView />
    </HydrationBoundary>
  );
}
