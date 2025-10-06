import React from 'react';

import clsx from 'clsx';

import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';
import { Grid } from '@/shared/ui';

import { ProductType } from '../../model/product.type';
import { ProductCard } from '../product-card';

import styles from './product-list.module.css';

type ProductListView = 'block' | 'list' | 'table';

type ProductListProps = {
  items: ProductType[];
  map: CatalogMap;
  title?: string;
  view?: ProductListView;
};

export const ProductList = ({
  items,
  map,
  title,
  view = 'block',
}: ProductListProps) => {
  if (!items.length) {
    return <div>Товары не найдены.</div>;
  }

  return (
    <div className={styles.root}>
      {title && <h2>{title}</h2>}
      <Grid
        gap="sm"
        isContainer
        // Применяем разные классы для сетки в зависимости от вида
        className={clsx(
          styles.list,
          view === 'list' && styles.list_view_list,
          view === 'table' && styles.list_view_table,
        )}
      >
        {items.map((item) => {
          if (view === 'list') {
            return 'Вид списков';
          }

          if (view === 'table') {
            return 'Данные таблицы';
          }

          return <ProductCard key={item.item_id} product={item} map={map} />;
        })}
      </Grid>
    </div>
  );
};
