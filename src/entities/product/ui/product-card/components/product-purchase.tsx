import Link from 'next/link';

import { useProductListContext } from '@/entities/product/model/product-list-context';
import { ProductType } from '@/entities/product/model/product.type';
import { useProductListMutation } from '@/features/product/hooks/use-product-list-mutation';
import { cartApi } from '@/shared/api/list.api';
import { Button, Flex, QuantityCounter } from '@/shared/ui';
import { useToast } from '@/shared/ui/toast';

import styles from './../product-card.module.scss';

type ProductPurchaseProps = {
  product: ProductType;
};

export const ProductPurchase = ({ product }: ProductPurchaseProps) => {
  const { addToast } = useToast();
  const { cartIds } = useProductListContext();

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
    <Flex direction="column" gap="sm" className={styles.purchase}>
      <Flex gap="sm" className={styles.purchase_wrapper}>
        {isCart ? (
          <Button
            variant="primary"
            size="sm"
            asChild
            className={styles.add_button}
          >
            <Link href="/cart">В корзине {1} шт.</Link>
          </Button>
        ) : (
          <>
            <div className={styles.quantity_control}>
              <QuantityCounter value={1} onChange={() => {}} />
            </div>
            <Button
              variant="primary"
              size="sm"
              className={styles.add_button}
              onClick={() => toggleCart({ product })}
            >
              В корзину
            </Button>
          </>
        )}
      </Flex>
      <Button variant="outline" size="sm" className={styles.buy_button}>
        Купить в один клик
      </Button>
    </Flex>
  );
};
