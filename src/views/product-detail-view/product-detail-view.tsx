'use client';

import { ProductType } from '@/entities/product/model/product.type';
import { catalogApi } from '@/shared/api/catalog.api';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { Flex, Grid, Heading, ProductSlider, Rating } from '@/shared/ui';
import { usePathname } from 'next/navigation';

import { ProductActions } from '@/features/product/ui';
import { ProductPurchase } from '@/features/product/ui/product-purchase';
import { ProductFaq, ProductTabs } from '@/widgets';
import styles from './product-detail-view.module.scss';

export const ProductDetailView = () => {
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

  if (!product) {
    return <div>Product not found</div>;
  }

  const { title, rating, imgs } = product;

  const faqItems = product.sections_objects.faq
    ? Object.values(product.sections_objects.faq)
    : [];

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
                  <Flex direction="row" gap="sm" className={styles.actions}>
                    <ProductActions product={product} />
                  </Flex>
                </Flex>
              </Flex>
              <div>Характеристики</div>

              <ProductPurchase product={product} />
            </Grid>
          </Grid>
          <ProductTabs product={product} />
          <ProductFaq items={faqItems} title="Вопросы и ответы" />
        </Flex>
      </div>
    </section>
  );
};
