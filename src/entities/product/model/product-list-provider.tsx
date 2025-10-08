'use client';

import { useMemo } from 'react';

import { useCompareQuery } from '@/features/compare/hooks/useCompare';
import { useFavoritesQuery } from '@/features/favorite/hooks/useFavorites';
import { getSessionId } from '@/shared/api/session.api';

import { ProductListContext } from './product-list-context';

export const ProductListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sessionId = getSessionId();

  // Получаем данные для избранного и сравнения один раз здесь
  const { items: favoriteProducts } = useFavoritesQuery({ sessionId });
  const { items: compareProducts } = useCompareQuery({ sessionId });

  // Создаем Set'ы с ID для быстрой проверки
  const favoriteIds = useMemo(
    () => new Set(favoriteProducts.map((p) => p.item_id)),
    [favoriteProducts],
  );
  const compareIds = useMemo(
    () => new Set(compareProducts.map((p) => p.item_id)),
    [compareProducts],
  );

  return (
    <ProductListContext.Provider value={{ favoriteIds, compareIds }}>
      {children}
    </ProductListContext.Provider>
  );
};
