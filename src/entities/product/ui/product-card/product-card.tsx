import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';
import { Button, Flex, Rating, StockStatus } from '@/shared/ui';

import { ProductType } from '../../model/product.type';

import { ProductActions, ProductPurchase } from '@/features/product/ui';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import {
  ProductBadges,
  ProductCharacteristics,
  ProductImageSlider,
  ProductPrice,
  ProductTitle,
} from '../components';
import styles from './product-card.module.scss';

type ProductCardProps = {
  product: ProductType;
  map?: CatalogMap;
};

export const ProductCard = ({ product, map }: ProductCardProps) => {
  return (
    <Flex direction="column" gap="sm" className={styles.root}>
      <Flex align="center" justify="center" className={styles.top}>
        <ProductBadges product={product} className={styles.badges} />
        <ProductImageSlider product={product} width={300} height={300} />
        <Flex direction="column" gap="sm" className={styles.actions}>
          <ProductActions product={product} />
          <Button
            variant="icon"
            icon={<EyeOpenIcon />}
            className={styles.action_button}
            aria-label="Просмотреть товар"
          />
        </Flex>
      </Flex>
      <ProductTitle product={product} className={styles.title} />
      <ProductPrice product={product} />
      <Flex direction="column" gap="sm" className={styles.info}>
        <Flex align="center" justify="between">
          <Rating rating={product.rating} />
          <StockStatus in_stock={product.in_stock} />
        </Flex>
        <ProductCharacteristics product={product} map={map} />
        <ProductPurchase product={product} />
        <Button variant="outline" size="sm" className={styles.buy_button}>
          Купить в один клик
        </Button>
      </Flex>
    </Flex>
  );
};
