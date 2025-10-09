'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

import { ProductType } from '@/entities/product/model/product.type';
import { NEXT_PUBLIC_IMAGE_URL } from '@/shared/config/site.config';
import { Button } from '@/shared/ui';

import styles from './dropdown-product-item.module.scss';

interface DropdownProductItemProps {
  product: ProductType;
  onRemove: (productId: string) => void;
}

export const DropdownProductItem = ({
  product,
  onRemove,
}: DropdownProductItemProps) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(product.item_id);
  };

  const imageUrl =
    product.imgs && product.imgs[0]
      ? NEXT_PUBLIC_IMAGE_URL + product.imgs[0]
      : '/image-placeholder.png';
  const price = product.price ? `${product.price} ₽` : '';

  return (
    <div className={styles.item}>
      <Link href={product.url} className={styles.link}>
        <div className={styles.image_wrapper}>
          <Image
            src={imageUrl}
            alt={product.title}
            width={60}
            height={60}
            className={styles.image}
          />
        </div>
        <div className={styles.content}>
          <h4 className={styles.title}>{product.title}</h4>
          {price && <p className={styles.price}>{price}</p>}
        </div>
      </Link>
      <Button
        variant="icon"
        icon={<TrashIcon />}
        onClick={handleRemove}
        className={styles.remove_button}
        title="Удалить"
        aria-label="Удалить товар"
      />
    </div>
  );
};
