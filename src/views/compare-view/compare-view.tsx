'use client';

import { MixerHorizontalIcon } from '@radix-ui/react-icons';

import { ProductCard } from '@/entities/product/ui/product-card';
import { useProductListQuery } from '@/features/product/hooks/use-product-list-query';
import { ListProductType } from '@/shared/types/list.product.type';
import { Grid, Heading } from '@/shared/ui';
import { EmptyState } from '@/shared/ui/empty-state';

type CompareViewProps = {
  initialItems: ListProductType[];
  sessionId: string | undefined;
};

export const CompareView = ({ initialItems, sessionId }: CompareViewProps) => {
  const { items } = useProductListQuery({
    initialItems,
    sessionId,
    queryKey: 'compare',
  });

  return (
    <>
      <Heading as="h1" size="1">
        Сравнение
      </Heading>
      {!items.length ? (
        <EmptyState
          icon={<MixerHorizontalIcon width={50} height={50} />}
          title="Нет товаров для сравнения"
          description="Добавьте товары в сравнения, чтобы отслеживать их цену и наличие."
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
