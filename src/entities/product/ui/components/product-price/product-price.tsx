import { ProductType } from '@/entities/product/model/product.type';
import { formatPrice } from '@/shared/lib/format-price';
import { Flex } from '@/shared/ui';

import styles from './product-price.module.scss';

type ProductPriceProps = {
  product: ProductType;
};

export const ProductPrice = ({ product }: ProductPriceProps) => {
  const { price, discount } = product;

  const discountPrice = Number(price) * (Number(discount) / 100);
  const discountedPrice = Number(price) - discountPrice;

  const discountedPriceFormatted = formatPrice(discountedPrice);
  const priceFormatted = formatPrice(price);

  return (
    <Flex className={styles.root}>
      {discount ? (
        <div className={styles.discount}>
          <ins>{discountedPriceFormatted}</ins>
          <del>{priceFormatted}</del>
        </div>
      ) : (
        priceFormatted
      )}
    </Flex>
  );
};
