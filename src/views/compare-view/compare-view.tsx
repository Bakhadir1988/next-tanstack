'use client';

import { ProductCard } from '@/entities/product/ui/product-card';
import { useCompareQuery } from '@/features/compare/hooks/useCompare';
import { ListProductType } from '@/shared/types/list.product.type';
import { Grid, Heading } from '@/shared/ui';

type CompareViewProps = {
  initialItems: ListProductType[];
  sessionId: string | undefined;
};

export const CompareView = ({ initialItems, sessionId }: CompareViewProps) => {
  const { items: compareProducts } = useCompareQuery({
    initialItems,
    sessionId,
  });

  // Контекст теперь предоставляется глобально, поэтому здесь он не нужен.
  return (
    <>
      <Heading as="h1" size="1">
        Сравнение
      </Heading>
      <Grid columns="repeat(4, 1fr)" gap="md">
        {compareProducts.map((product) => (
          <ProductCard key={product.item_id} product={product} />
        ))}
      </Grid>
    </>
  );
};
