import { Button, Flex, QuantityCounter, useToast } from '@/shared/ui';

import { useProductListContext } from '@/entities/product/model/product-list-context';
import { ProductType } from '@/entities/product/model/product.type';
import { cartApi } from '@/shared/api/list.api';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { useProductListMutation } from '../../hooks/use-product-list-mutation';
import styles from './product-purchase.module.scss';

type ProductPurchaseProps = {
  product: ProductType;
  className?: string;
};

export const ProductPurchase = ({
  product,
  className,
}: ProductPurchaseProps) => {
  const { addToast } = useToast();

  const { cartIds } = useProductListContext();
  const [quantity, setQuantity] = useState(1);

  const isCart = cartIds.has(product.item_id);

  const { toggle: toggleCart } = useProductListMutation({
    queryKey: 'cart',
    api: cartApi,
    onSuccessAction: (isAdded) => {
      addToast({
        image: product.imgs,
        description: product.title,
        href: isAdded ? '/cart/' : undefined,
        title: isAdded ? 'Добавлено в корзину' : 'Удалено из корзины',
      });
    },
  });

  return (
    <Flex
      direction="column"
      gap="sm"
      className={clsx(styles.root, styles.item, className)}
    >
      <Flex gap="sm">
        {isCart ? (
          <Button
            variant="primary"
            size="sm"
            asChild
            full_width
            className={styles.add_button}
          >
            <Link href="/cart">В корзине {quantity} шт.</Link>
          </Button>
        ) : (
          <>
            <div className={styles.quantity_control}>
              <QuantityCounter value={quantity} onChange={setQuantity} />
            </div>
            <Button
              variant="primary"
              size="sm"
              full_width
              className={styles.add_button}
              onClick={() => toggleCart({ product, quantity })}
            >
              В корзину
            </Button>
          </>
        )}
      </Flex>
    </Flex>
  );
};
