import Link from 'next/link';

import { Button, Flex } from '@/shared/ui';

import styles from './cart-summary.module.scss';
export const CartSummary = () => {
  return (
    <Flex direction="column" gap="sm" className={styles.root}>
      <Flex direction="column" gap="sm" className={styles.summary}>
        <Flex justify="between" className={styles.total_price}>
          Итого: <span>100 ₽</span>
        </Flex>
        <Button asChild size="sm">
          <Link href="/order">Оформить заказ</Link>
        </Button>
        <Button size="sm" variant="outline">
          Купить в один клик
        </Button>
      </Flex>
      <Button className={styles.clear_button} size="sm" variant="ghost">
        Очистить корзину
      </Button>
    </Flex>
  );
};
