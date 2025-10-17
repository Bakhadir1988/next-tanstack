'use client';

import { HeartIcon, LayersIcon } from '@radix-ui/react-icons';

import { useProductListContext } from '@/entities/product/model/product-list-context';
import { ProductType } from '@/entities/product/model/product.type';
import { useProductListMutation } from '@/features/product/hooks/use-product-list-mutation';
import { compareApi, favoritesApi } from '@/shared/api/list.api';
import { ActionButton } from '@/shared/ui';
import { useToast } from '@/shared/ui/toast';

// --- Компонент ---
type ProductActionsProps = {
  product: ProductType;
};

export const ProductActions = ({ product }: ProductActionsProps) => {
  const { addToast } = useToast();
  // 1. Получаем ID из контекста
  const { favoriteIds, compareIds } = useProductListContext();

  // 2. Определяем состояние для каждого списка
  const isFavorite = favoriteIds.has(product.item_id);
  const isCompare = compareIds.has(product.item_id);

  // 3. Используем универсальный хук для ИЗБРАННОГО
  const { toggle: toggleFavorite, isLoading: isFavoriteLoading } =
    useProductListMutation({
      queryKey: 'favorites',
      api: favoritesApi,
      onSuccessAction: (isAdded) => {
        addToast({
          image: product.imgs,
          description: product.title,
          href: isAdded ? `/favorites/` : undefined,
          title: isAdded ? 'Добавлено в избранное' : 'Удалено из избранного',
        });
      },
    });

  // 4. Используем универсальный хук для СРАВНЕНИЯ
  const { toggle: toggleCompare, isLoading: isCompareLoading } =
    useProductListMutation({
      queryKey: 'compare',
      api: compareApi,
      onSuccessAction: (isAdded) => {
        addToast({
          image: product.imgs,
          description: product.title,
          href: isAdded ? `/compare/` : undefined,
          title: isAdded ? 'Добавлено в сравнение' : 'Удалено из сравнения',
        });
      },
    });

  return (
    <>
      <ActionButton
        icon={<HeartIcon />}
        onClick={() => toggleFavorite({ product })}
        disabled={isFavoriteLoading}
        isActive={isFavorite}
        titleActive="Убрать из избранного"
        titleInactive="Добавить в избранное"
      />

      <ActionButton
        icon={<LayersIcon />}
        onClick={() => toggleCompare({ product })}
        disabled={isCompareLoading}
        isActive={isCompare}
        titleActive="Убрать из сравнения"
        titleInactive="Добавить в сравнения"
      />
    </>
  );
};
