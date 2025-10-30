'use client';

import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import { CartProductRow } from '@/entities/product/ui/cart-product-row/cart-product-row';
import { CartSummary } from '@/entities/product/ui/cart-summary/cart-summary';
import { cartApi, ListResponse } from '@/shared/api/list.api';
import { useSession } from '@/shared/lib/session.context';
import { Flex, Grid, Heading } from '@/shared/ui';
import { EmptyState } from '@/shared/ui/empty-state';

export const CartView = () => {
  const sessionId = useSession();

  const { data } = useQuery<ListResponse>({
    queryKey: ['cart', sessionId],
    queryFn: () => cartApi.get(sessionId),
    enabled: !!sessionId,
  });

  const items: ProductType[] = (data?.items ?? []).map((item) => ({
    ...item.data,
    url: item.url,
    quantity: item.quantity,
  }));

  return (
    <div className="container">
      <Heading as="h1">Корзина</Heading>
      {!items.length ? (
        <EmptyState
          icon={<MixerHorizontalIcon width={50} height={50} />}
          title="Нет товаров в корзине"
          description="Добавьте товары в корзину, чтобы отслеживать их цену и наличие."
        />
      ) : (
        <Grid columns="1fr 350px" gap="md" align="start">
          <Flex direction="column">
            {items.map((product) => (
              <CartProductRow key={product.item_id} product={product} />
            ))}
          </Flex>
          <CartSummary />
        </Grid>
      )}
    </div>
  );
};
