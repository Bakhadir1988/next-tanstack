import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';

import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';
import { formatPrice } from '@/shared/lib/format-price';
import { truncateText } from '@/shared/lib/truncate-text';
import { Flex, Rating, StockStatus } from '@/shared/ui';

import { ProductType } from '../../model/product.type';

import {
  ProductActions,
  ProductBadges,
  ProductCharacteristics,
  ProductImageSlider,
  ProductPurchase,
} from './components';
import styles from './product-card.module.scss';

type ProductCardProps = {
  product: ProductType;
  map?: CatalogMap;
};

export const ProductCard = ({ product, map }: ProductCardProps) => {
  const controls = useAnimation();
  const MotionFlex = motion(Flex);

  const { title, imgs, url, price, in_stock, rating, discount } = product;

  const discountPrice = Number(price) * (Number(discount) / 100);
  const discountedPrice = Number(price) - discountPrice;

  const discountedPriceFormatted = formatPrice(discountedPrice);
  const priceFormatted = formatPrice(price);

  const truncatedTitle = truncateText(title, 50);

  return (
    <MotionFlex
      direction="column"
      gap="sm"
      className={styles.root}
      onMouseEnter={() => controls.start('hover')}
      onMouseLeave={() => controls.start('initial')}
      animate={controls}
      initial="initial"
    >
      <Flex align="center" justify="center" className={styles.top}>
        <ProductBadges product={product} />
        <ProductImageSlider imgs={imgs} alt={title} />
        <ProductActions product={product} />
      </Flex>
      <div className={styles.price}>
        {discount ? (
          <div className={styles.discount}>
            <ins>{discountedPriceFormatted}</ins>
            <del>{priceFormatted}</del>
          </div>
        ) : (
          priceFormatted
        )}
      </div>
      <Link href={url} className={styles.title}>
        {truncatedTitle}
      </Link>
      <Flex direction="column" gap="sm" className={styles.info}>
        <Flex align="center" justify="between">
          <Rating rating={rating} />
          <StockStatus in_stock={in_stock} />
        </Flex>
        <ProductCharacteristics product={product} map={map} />
        <ProductPurchase />
      </Flex>
    </MotionFlex>
  );
};
