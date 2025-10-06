import React from 'react';

import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';
import { ProductType } from '@/entities/product/model/product.type';
import { transformProductProperties } from '@/shared/lib/transform-product-properties';

import styles from '../product-card.module.scss';

type ProductCharacteristicsProps = {
  product: ProductType;
  map?: CatalogMap;
};

export const ProductCharacteristics = ({
  product,
  map,
}: ProductCharacteristicsProps) => {
  const characteristics = transformProductProperties(product, map);

  const validCharacteristics = characteristics.filter((char) => {
    const hasValue = Array.isArray(char.value)
      ? char.value.length > 0
      : !!char.value;
    return char.title !== 'Состав' && hasValue;
  });

  if (!validCharacteristics.length) {
    return null;
  }

  return (
    <ul className={styles.characteristics_list}>
      {validCharacteristics.map((char) => (
        <li key={char.title} className={styles.characteristics_item}>
          <span className={styles.characteristics_title}>{char.title} </span>
          <span className={styles.characteristics_value}>
            {Array.isArray(char.value) ? char.value.join(', ') : char.value}{' '}
            {char.unit}
          </span>
        </li>
      ))}
    </ul>
  );
};
