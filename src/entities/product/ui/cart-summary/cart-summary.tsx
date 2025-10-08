import { Flex } from '@/shared/ui';

import styles from './cart-summary.module.scss';
export const CartSummary = () => {
  return (
    <Flex className={styles.root}>
      <div className={styles.total_price}>Итого: 100 ₽</div>
    </Flex>
  );
};
