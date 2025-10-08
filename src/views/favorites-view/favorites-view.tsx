'use client';

import { ProductType } from '@/entities/product/model/product.type';
import { ProductCard } from '@/entities/product/ui/product-card';
import { useFavoritesQuery } from '@/features/favorite/hooks/useFavorites';
import { ListProductType } from '@/shared/types/list.product.type';
import { Grid, Heading } from '@/shared/ui';

// 1. Принимаем sessionId
type FavoritesViewProps = {
  initialItems: ListProductType[];
  sessionId: string | undefined;
};

export const FavoritesView = ({
  initialItems,
  sessionId,
}: FavoritesViewProps) => {
  const { items: products } = useFavoritesQuery({
    initialItems,
    sessionId,
  });

  return (
    <>
      <Heading as="h1" size="1">
        Избранное
      </Heading>
      <Grid columns="repeat(4, 1fr)" gap="md">
        {products.map((product: ProductType) => (
          // Передаем информацию о том, что этот товар в избранном
          <ProductCard
            key={product.item_id}
            product={product}
            isFavorite={true}
          />
        ))}
      </Grid>
    </>
  );
};
