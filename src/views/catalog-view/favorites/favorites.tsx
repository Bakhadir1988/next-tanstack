// src/views/catalog-view/favorites/favorites.tsx
'use client';

import { useFavoritesQuery } from '@/entities/favorite/model/useFavorites';
import { ProductType } from '@/entities/product/model/product.type';
import { ProductCard } from '@/entities/product/ui/product-card';
import { Grid } from '@/shared/ui';

// 1. Принимаем sessionId
type FavoritesViewProps = {
  initialItems: ProductType[];
  sessionId: string | undefined;
};

export const FavoritesView = ({
  initialItems,
  sessionId,
}: FavoritesViewProps) => {
  const { items } = useFavoritesQuery({ initialItems, sessionId });

  return (
    <Grid columns="repeat(4, 1fr)" gap="md">
      {items.map((item) => (
        // Передаем информацию о том, что этот товар в избранном
        <ProductCard key={item.item_id} product={item} isFavorite={true} />
      ))}
    </Grid>
  );
};
