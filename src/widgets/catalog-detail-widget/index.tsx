'use client';

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { ProductType } from '@/entities/product/model/product.type';
import { catalogApi } from '@/shared/api/catalog.api';
import {
  Button,
  Flex,
  Grid,
  Heading,
  ProductSlider,
  Rating,
} from '@/shared/ui';

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

  if (!product) return null;

  const { title, rating, imgs } = product;

  return (
    <section className={styles.root}>
      <div className={clsx('container', styles.container)}>
        <Flex direction={'column'} gap={'lg'}>
          <div>breadcrumbs</div>
          <Grid gap={'md'} className={styles.main}>
            <ProductSlider images={imgs} />

            <Grid gap={'md'} className={styles.info}>
              <Flex direction={'column'} gap={'md'} className={styles.heading}>
                <Heading as="h1" className={styles.title}>
                  {title}
                </Heading>
                <Flex gap={'md'} justify={'between'}>
                  <div className={styles.rating}>
                    <Rating value={rating} />
                  </div>
                  <div className={styles.actions}>actions</div>
                </Flex>
              </Flex>

              <div>Характеристики</div>

              <div className={styles.purchase}>
                <div className={styles.purchase_item}>
                  <div className={styles.price}>price</div>
                  <Button full_width className={styles.add_to_cart}>
                    add_to_cart
                  </Button>
                  <Button full_width className={styles.one_click}>
                    one_click
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Flex>
      </div>
    </section>
  );
};
