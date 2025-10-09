'use client';

import Link from 'next/link';

import { ProductType } from '@/entities/product/model/product.type';
import { DropdownProductItem } from '@/entities/product/ui/dropdown-product-item';
import { Button } from '@/shared/ui';

import styles from './product-list-dropdown.module.scss';

interface ProductListDropdownProps {
  products: ProductType[];
  onRemove: (productId: string) => void;
  emptyIcon?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  actionLabel?: string;
  actionHref?: string;
  totalPrice?: string;
}

export const ProductListDropdown = ({
  products,
  onRemove,
  emptyIcon,
  emptyTitle = 'Нет товаров',
  emptyDescription,
  actionLabel,
  actionHref,
  totalPrice,
}: ProductListDropdownProps) => {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.empty_content}>
          {emptyIcon && <div className={styles.empty_icon}>{emptyIcon}</div>}
          <h4 className={styles.empty_title}>{emptyTitle}</h4>
          {emptyDescription && (
            <p className={styles.empty_description}>{emptyDescription}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.list}>
        {products.map((product) => (
          <DropdownProductItem
            key={product.item_id}
            product={product}
            onRemove={onRemove}
          />
        ))}
      </div>

      {(totalPrice || actionLabel) && (
        <div className={styles.footer}>
          {totalPrice && (
            <div className={styles.total}>
              <span className={styles.total_label}>Итого</span>
              <span className={styles.total_price}>{totalPrice}</span>
            </div>
          )}
          {actionLabel && actionHref && (
            <Link href={actionHref} className={styles.action_link}>
              <Button variant="primary" className={styles.action_button}>
                {actionLabel}
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
