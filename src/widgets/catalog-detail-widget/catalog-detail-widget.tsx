'use client';

import { useProductListContext } from '@/entities/product/model/product-list-context';
import { ProductType } from '@/entities/product/model/product.type';
import { useProductListMutation } from '@/features/product/hooks/use-product-list-mutation';
import { catalogApi } from '@/shared/api/catalog.api';
import { compareApi, favoritesApi } from '@/shared/api/list.api';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { HeartIcon, LayersIcon } from '@radix-ui/react-icons';

import {
  ActionButton,
  Flex,
  Grid,
  Heading,
  ProductSlider,
  Rating,
  useToast,
} from '@/shared/ui';
import { usePathname } from 'next/navigation';

import { ProductPurchase } from '@/features/product/ui/product-purchase';
import styles from './catalog-detail-widget.module.scss';

export const CatalogDetailWidget = () => {
  const params = usePathname();

  const { data: product } = useQuery<ProductType>({
    queryKey: ['catalog', params],
    queryFn: async () => {
      const data = (await catalogApi.get(params)) as ProductType | null;
      if (!data) {
        throw new Error('Товар не найден');
      }
      return data;
    },
    enabled: !!params,
  });

  const { addToast } = useToast();
  // 1. Получаем ID из контекста
  const { favoriteIds, compareIds } = useProductListContext();

  // 3. Используем универсальный хук для ИЗБРАННОГО
  const { toggle: toggleFavorite, isLoading: isFavoriteLoading } =
    useProductListMutation({
      queryKey: 'favorites',
      api: favoritesApi,
      onSuccessAction: (isAdded) => {
        if (!product) return;
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
        if (!product) return;
        addToast({
          image: product.imgs,
          description: product.title,
          href: isAdded ? `/compare/` : undefined,
          title: isAdded ? 'Добавлено в сравнение' : 'Удалено из сравнения',
        });
      },
    });

  if (!product) {
    return <div>Product not found</div>;
  }

  // 2. Определяем состояние для каждого списка
  const isFavorite = favoriteIds.has(product.item_id);
  const isCompare = compareIds.has(product.item_id);

  const { title, rating, imgs } = product;

  return (
    <section className={styles.root}>
      <div className={clsx('container', styles.container)}>
        <Flex direction={'column'} gap={'lg'}>
          <div>breadcrumbs</div>
          <Grid gap={'md'} className={styles.main} align="start">
            <ProductSlider images={imgs} />

            <Grid gap={'md'} className={styles.info}>
              <Flex direction={'column'} gap={'md'} className={styles.heading}>
                <Heading as="h1" className={styles.title}>
                  {title}
                </Heading>
                <Flex gap={'md'} justify={'between'}>
                  <Flex align="center" gap="sm" className={styles.rating}>
                    <Rating rating={rating} />
                    <a href="#">1 отзыв</a>
                  </Flex>
                  <Flex gap="sm" className={styles.actions}>
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
                  </Flex>
                </Flex>
              </Flex>
              <div>Характеристики</div>

              <ProductPurchase product={product} />
            </Grid>
          </Grid>
        </Flex>
      </div>
    </section>
  );
};
