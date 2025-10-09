'use client';

import { EyeOpenIcon, HeartIcon, LayersIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import { useProductListContext } from '@/entities/product/model/product-list-context';
import { ProductType } from '@/entities/product/model/product.type';
import { useProductListMutation } from '@/features/product/hooks/use-product-list-mutation';
import { compareApi, favoritesApi } from '@/shared/api/list.api';
import { Button, Flex } from '@/shared/ui';

import styles from './../product-card.module.scss';

// --- Компонент ---
type ProductActionsProps = {
  product: ProductType;
};

export const ProductActions = ({ product }: ProductActionsProps) => {
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
    });

  // 4. Используем универсальный хук для СРАВНЕНИЯ
  const { toggle: toggleCompare, isLoading: isCompareLoading } =
    useProductListMutation({
      queryKey: 'compare',
      api: compareApi,
    });

  return (
    <Flex direction="column" className={styles.actions}>
      <Button
        variant="icon"
        icon={<HeartIcon />}
        onClick={() => toggleFavorite({ product })}
        className={clsx(
          styles.action_button,
          isFavorite && styles.action_button_active,
        )}
        title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        disabled={isFavoriteLoading}
        aria-label={
          isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'
        }
      />
      <Button
        variant="icon"
        icon={<LayersIcon />}
        onClick={() => toggleCompare({ product })}
        className={clsx(
          styles.action_button,
          isCompare && styles.action_button_active,
        )}
        title={isCompare ? 'Убрать из сравнения' : 'Добавить в сравнение'}
        disabled={isCompareLoading}
        aria-label={isCompare ? 'Убрать из сравнения' : 'Добавить в сравнение'}
      />
      <Button
        variant="icon"
        icon={<EyeOpenIcon />}
        className={styles.action_button}
        aria-label="Просмотреть товар"
      />
    </Flex>
  );
};
