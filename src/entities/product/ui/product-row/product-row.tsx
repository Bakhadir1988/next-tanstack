import Link from 'next/link';

import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';
import { Flex, Rating, StockStatus } from '@/shared/ui';

import { ProductType } from '../../model/product.type';

import { ProductCharacteristics } from '../components';
import styles from './product-row.module.scss';

type ProductRowProps = {
  product: ProductType;
  map?: CatalogMap;
};

export const ProductRow = ({ product, map }: ProductRowProps) => {
  const { url, rating, in_stock } = product;

  return (
    <Flex gap="lg" className={styles.root}>
      <Flex direction="column" gap="sm" align="start" className={styles.info}>
        <Link href={url} className={styles.title}>
          {product.title}
        </Link>
        <Flex align="center" gap="sm">
          <Rating rating={rating} />
          <StockStatus in_stock={in_stock} />
        </Flex>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum saepe
          tempore ipsum architecto molestiae sapiente nostrum non obcaecati
          impedit. Facere dignissimos hic quaerat. Neque voluptatem, quo libero
          officia deleniti sed.
        </span>
        <ProductCharacteristics product={product} map={map} />
      </Flex>
      <div className={styles.buttons}></div>
    </Flex>
  );
};
