import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';
import { ProductType } from '@/entities/product/model/product.type';
import { transformProductProperties } from '@/shared/lib/transform-product-properties';

import clsx from 'clsx';
import styles from './product-characteristics.module.scss';

type ProductCharacteristicsProps = {
  product: ProductType;
  map?: CatalogMap;
  className?: string;
};

export const ProductCharacteristics = ({
  product,
  map,
  className,
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
    <ul className={clsx(styles.root, className)}>
      {validCharacteristics.map((char) => (
        <li key={char.title} className={styles.item}>
          <span className={styles.title}>{char.title} </span>
          <span className={styles.value}>
            {Array.isArray(char.value) ? char.value.join(', ') : char.value}
            {char.unit}
          </span>
        </li>
      ))}
    </ul>
  );
};
