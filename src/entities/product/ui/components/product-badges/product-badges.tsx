import { ProductType } from '@/entities/product/model/product.type';
import { Badge, Flex } from '@/shared/ui';

import clsx from 'clsx';
import styles from './product-badges.module.scss';

type ProductBadgesProps = {
  product: ProductType;
  className?: string;
};

export const ProductBadges = ({ product, className }: ProductBadgesProps) => {
  return (
    <Flex wrap="wrap" className={clsx(styles.root, className)}>
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
