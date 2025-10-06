'use client';

import { useQuery } from '@tanstack/react-query';

import { ProductCard } from '@/entities/product/ui/product-card';
import { favoritesApi, ListResponse } from '@/shared/api/list.api';
import { Grid } from '@/shared/ui';

type FavoritesViewProps = {
  sessionId?: string;
  initialData: ListResponse | string;
};

export const FavoritesView = ({
  sessionId,
  initialData,
}: FavoritesViewProps) => {
  const { data, isLoading, isError } = useQuery<ListResponse | string>({
    queryKey: ['favorites', sessionId],
    queryFn: () => favoritesApi.get(sessionId || ''),
    enabled: !!sessionId,
    initialData: initialData,
  });

  // Определяем items безопасно
  const items =
    typeof data === 'string'
      ? [] // API вернул текст вместо JSON
      : (data?.items ?? []);

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка при загрузке избранного</p>;
  if (!items.length) return <p>Нет избранных товаров</p>;

  console.log(items);

  return (
    <Grid columns="repeat(4, 1fr)" gap="md">
      {items.map((item) => (
        <ProductCard key={item.item_id} product={item} />
      ))}
    </Grid>
  );
};
