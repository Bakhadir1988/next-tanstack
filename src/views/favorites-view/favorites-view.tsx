'use client';

import { ProductCard } from '@/entities/product/ui/product-card';
import { useFavoritesQuery } from '@/features/favorite/hooks/useFavorites';
import { ListProductType } from '@/shared/types/list.product.type';
import { Grid, Heading } from '@/shared/ui';

type FavoritesViewProps = {
  initialItems: ListProductType[];
  sessionId: string | undefined;
};

export const FavoritesView = ({
  initialItems,
  sessionId,
}: FavoritesViewProps) => {
  const { items: favoriteProducts } = useFavoritesQuery({
    initialItems,
    sessionId,
  });

  // Контекст теперь предоставляется глобально, поэтому здесь он не нужен.
  return (
    <>
      <Heading as="h1" size="1">
        Избранное
      </Heading>
      <Grid columns="repeat(4, 1fr)" gap="md">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.item_id} product={product} />
        ))}
      </Grid>
    </>
  );
};
