import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';
import { ProductType } from '@/entities/product/model/product.type';
import { transformProductProperties } from '@/shared/lib/transform-product-properties';

import clsx from 'clsx';
import styles from './comapre-product-characteristics.module.scss';

type CompareProductCharacteristicsProps = {
  product: ProductType;
  map?: CatalogMap;
  className?: string;
  showTitle?: boolean;
  showOnlyDifferences?: boolean;
  differingCharacteristics?: Set<string>;
  allCharacteristicTitles?: string[];
};

export const CompareProductCharacteristics = ({
  product,
  map,
  className,
  showTitle = true,
  showOnlyDifferences = false,
  differingCharacteristics,
  allCharacteristicTitles = [],
}: CompareProductCharacteristicsProps) => {
  const characteristics = transformProductProperties(product, map);

  const validCharacteristics = characteristics.filter((char) => {
    const hasValue = Array.isArray(char.value)
      ? char.value.length > 0
      : !!char.value;
    return char.title !== 'Состав' && hasValue;
  });

  const titlesToDisplay = showOnlyDifferences
    ? allCharacteristicTitles.filter((title) =>
        differingCharacteristics?.has(title),
      )
    : allCharacteristicTitles;

  if (!titlesToDisplay.length) {
    return null;
  }

  return (
    <ul className={clsx(styles.root, className)}>
      {titlesToDisplay.map((title) => {
        const char = validCharacteristics.find((c) => c.title === title);

        return (
          <li
            key={title}
            className={clsx(styles.item, {
              [styles.isDifferent]: differingCharacteristics?.has(title),
            })}
          >
            {showTitle && <span className={styles.title}>{title} </span>}
            <span className={styles.value}>
              {char ? (
                <>
                  {Array.isArray(char.value)
                    ? char.value.join(', ')
                    : char.value}
                  {char.unit}
                </>
              ) : (
                '-'
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
};
