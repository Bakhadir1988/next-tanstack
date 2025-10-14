'use client';

import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import { ProductCard } from '@/entities/product/ui/product-card';
import { compareApi, ListResponse } from '@/shared/api/list.api';
import { useSession } from '@/shared/lib/session.context';
import { Grid, Heading } from '@/shared/ui';
import { EmptyState } from '@/shared/ui/empty-state';

export const CompareView = () => {
  const sessionId = useSession();

  const { data } = useQuery<ListResponse>({
    queryKey: ['compare', sessionId],
    queryFn: () => compareApi.get(sessionId),
    enabled: !!sessionId,
  });

  console.log('data', data);

  const items: ProductType[] = (data?.items ?? []).map((item) => ({
    ...item.data,
    url: item.url,
  }));

  if (!items.length) {
    return (
      <EmptyState
        icon={<MixerHorizontalIcon width={50} height={50} />}
        title="Нет товаров для сравнения"
        description="Добавьте товары в сравнения, чтобы отслеживать их цену и наличие."
      />
    );
  }

  return (
    <>
      <Heading as="h1" size="1">
        Сравнение
      </Heading>

      <Grid columns="repeat(4, 1fr)" gap="md">
        {items.map((product) => (
          <ProductCard key={product.item_id} product={product} />
        ))}
      </Grid>
    </>
  );
};
