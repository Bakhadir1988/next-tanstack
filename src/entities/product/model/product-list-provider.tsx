'use client';

import { useMemo } from 'react';

import { useProductListQuery } from '@/features/product/hooks/use-product-list-query';

import { ProductListContext } from './product-list-context';

export const ProductListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Получаем данные для избранного и сравнения один раз здесь
  const { items: favoriteProducts } = useProductListQuery({
    queryKey: 'favorites',
  });
  const { items: compareProducts } = useProductListQuery({
    queryKey: 'compare',
  });
  const { items: cartProducts } = useProductListQuery({
    queryKey: 'cart',
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
