'use client';

import { useFavoritesQuery } from '@/entities/favorite/hooks/useFavorites';
import { ProductType } from '@/entities/product/model/product.type';
import { ProductCard } from '@/entities/product/ui/product-card';
import { ListProductType } from '@/shared/types/list.product.type';
import { Grid } from '@/shared/ui';

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
  );
};
