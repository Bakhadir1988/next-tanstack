import { ProductType } from '@/entities/product/model/product.type';
import Link from 'next/link';

import clsx from 'clsx';
import styles from './product-title.module.scss';

type ProductTitleProps = {
  product: ProductType;
  className?: string;
};

export const ProductTitle = ({ product, className }: ProductTitleProps) => {
  const truncatedTitle = product.title.slice(0, 50);

  return (
    <Link href={product.url} className={clsx(styles.root, className)}>
      {truncatedTitle}
    </Link>
  );
};
