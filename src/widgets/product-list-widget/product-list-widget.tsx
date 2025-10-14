'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';
import { ProductType } from '@/entities/product/model/product.type';
import { ProductCard } from '@/entities/product/ui/product-card';
import { ProductRow } from '@/entities/product/ui/product-row/product-row';
import { ProductTable } from '@/entities/product/ui/product-table/product-table';
import { Grid, Heading } from '@/shared/ui';
import { SegmentControlValue } from '@/shared/ui/segment-control';

import { ProductListToolbar } from '../product-list-toolbar';

import styles from './product-list-widget.module.scss';

type ProductListView = 'block' | 'row' | 'table';

type ProductListWidgetProps = {
  items: ProductType[];
  map: CatalogMap;
  title?: string;
  view?: ProductListView;
};

export const ProductListWidget = ({
  items,
  map,
  title,
}: ProductListWidgetProps) => {
  const [view, setView] = useState<SegmentControlValue>('block');

  if (!items.length) {
    return <div>Товары не найдены.</div>;
  }

  console.log(view);

  return (
    <section className={styles.root}>
      <div className={clsx(styles.container, 'container')}>
        <ProductListToolbar view={view} onViewChangeAction={setView} />

        {title && (
          <Heading as="h2" className={styles.title}>
            {title}
          </Heading>
        )}

        <Grid
          gap="sm"
          className={clsx(styles.list, {
            [styles.block]: view === 'block',
            [styles.row]: view === 'row',
            [styles.table]: view === 'table',
          })}
        >
          {items.map((item) => {
            switch (view) {
              case 'block':
                return (
                  <ProductCard key={item.item_id} product={item} map={map} />
                );
              case 'row':
                return (
                  <ProductRow key={item.item_id} product={item} map={map} />
                );
              case 'table':
                return <ProductTable key={item.item_id} />;
            }
          })}
        </Grid>
      </div>
    </section>
  );
};
