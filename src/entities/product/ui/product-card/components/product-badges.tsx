import { ProductType } from '@/entities/product/model/product.type';
import { Badge, Flex } from '@/shared/ui';

import styles from '../product-card.module.scss';

type ProductBadgesProps = {
  product: ProductType;
};

export const ProductBadges = ({ product }: ProductBadgesProps) => {
  return (
    <Flex wrap="wrap" className={styles.badges}>
      {product.novelty === '1' && (
        <Badge color="green" size="1" variant="solid">
          Новинка
        </Badge>
      )}
      {product.hit === '1' && (
        <Badge color="red" size="1" variant="solid">
          Хит
        </Badge>
      )}
      {product.recommend === '1' && (
        <Badge color="purple" size="1" variant="solid">
          Советуем
        </Badge>
      )}
      {product.discount && (
        <Badge color="purple" size="1" variant="solid">
          Скидка {product.discount}%
        </Badge>
      )}
    </Flex>
  );
};
