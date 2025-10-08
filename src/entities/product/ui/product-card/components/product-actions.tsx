'use client';

import { EyeOpenIcon, HeartIcon, LayersIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import { ProductType } from '@/entities/product/model/product.type';
import { useProductListMutation } from '@/features/product/hooks/use-product-list-mutation';
import { useProductListMutationCompare } from '@/features/product/hooks/use-product-list-mutation-comapre';
import { Button, Flex } from '@/shared/ui';

import styles from './../product-card.module.scss';

type ProductActionsProps = {
  product: ProductType;
  isFavorite?: boolean;
  isCompare?: boolean;
};

export const ProductActions = ({
  product,
  isFavorite,
  isCompare,
}: ProductActionsProps) => {
  const { toggle, isInList: isInListFromHook } = useProductListMutation({
    product: product,
    queryKey: 'favorites',
  });
  const { toggle: toggleCompare, isInList: isInListFromHookCompare } =
    useProductListMutationCompare({
      product: product,
      queryKey: 'compare',
    });

  // Отдаем приоритет пропсу isFavorite, если он есть (для SSR)
  // Иначе используем значение из хука (для CSR)
  const isInListFavorite = isFavorite ?? isInListFromHook;
  const isInListCompare = isCompare ?? isInListFromHookCompare;

  return (
    <Flex direction="column" className={styles.actions}>
      <Button
        variant="icon"
        icon={<HeartIcon />}
        onClick={() => toggle()}
        className={clsx(
          styles.action_button,
          isInListFavorite && styles.action_button_active,
        )}
        title={
          isInListFavorite ? 'Убрать из избранного' : 'Добавить в избранное'
        }
        aria-label={
          isInListFavorite ? 'Убрать из избранного' : 'Добавить в избранное'
        }
      />
      <Button
        variant="icon"
        icon={<LayersIcon />}
        onClick={() => toggleCompare()}
        className={clsx(
          styles.action_button,
          isInListCompare && styles.action_button_active,
        )}
        title={isInListCompare ? 'Убрать из сравнения' : 'Добавить в сравнение'}
        aria-label={
          isInListCompare ? 'Убрать из сравнения' : 'Добавить в сравнение'
        }
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
