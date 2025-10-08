'use client';

import { useMemo } from 'react';

import { useProductListQuery } from '@/features/product/hooks/use-product-list-query';
import { getSessionId } from '@/shared/api/session.api';

import { ProductListContext } from './product-list-context';

export const ProductListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sessionId = getSessionId();

  // Получаем данные для избранного и сравнения один раз здесь
  const { items: favoriteProducts } = useProductListQuery({
    queryKey: 'favorites',
    sessionId,
  });
  const { items: compareProducts } = useProductListQuery({
    queryKey: 'compare',
    sessionId,
  });
  const { items: cartProducts } = useProductListQuery({
    queryKey: 'cart',
    sessionId,
  });

  // Создаем Set'ы с ID для быстрой проверки
  const favoriteIds = useMemo(
    () => new Set(favoriteProducts.map((p) => p.item_id)),
    [favoriteProducts],
  );
  const compareIds = useMemo(
    () => new Set(compareProducts.map((p) => p.item_id)),
    [compareProducts],
  );
  const cartIds = useMemo(
    () => new Set(cartProducts.map((p) => p.item_id)),
    [cartProducts],
  );

  return (
    <ProductListContext.Provider value={{ favoriteIds, compareIds, cartIds }}>
      {children}
    </ProductListContext.Provider>
  );
};
