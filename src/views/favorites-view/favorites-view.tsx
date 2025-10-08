'use client';

import { HeartIcon } from '@radix-ui/react-icons';

import { ProductCard } from '@/entities/product/ui/product-card';
import { useProductListQuery } from '@/features/product/hooks/use-product-list-query';
import { ListProductType } from '@/shared/types/list.product.type';
import { Grid, Heading } from '@/shared/ui';
import { EmptyState } from '@/shared/ui/empty-state';

type FavoritesViewProps = {
  initialItems: ListProductType[];
  sessionId: string | undefined;
};

export const FavoritesView = ({
  initialItems,
  sessionId,
}: FavoritesViewProps) => {
  const { items } = useProductListQuery({
    initialItems,
    sessionId,
    queryKey: 'favorites',
  });

  return (
    <>
      <Heading as="h1">Избранное</Heading>
      {!items.length ? (
        <EmptyState
          icon={<HeartIcon width={50} height={50} />}
          title="Нет избранных товаров"
          description="Добавьте товары в избранное, чтобы отслеживать их цену и наличие."
        />
      ) : (
        <Grid columns="repeat(4, 1fr)" gap="md">
          {items.map((product) => (
            <ProductCard key={product.item_id} product={product} />
          ))}
        </Grid>
      )}
    </>
  );
};
