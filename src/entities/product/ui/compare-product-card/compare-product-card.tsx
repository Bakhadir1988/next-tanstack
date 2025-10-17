import Image from 'next/image';

import { Button } from '@/shared/ui';

import { TrashIcon } from '@radix-ui/react-icons';
import styles from './compare-product-card.module.scss';

// This component will receive props with product data in the future.
// For now, it's a static layout.
export const CompareProductCard = () => {
  return (
    <div className={styles.root}>
      <div className={styles.card_header}>
        <Image
          src="/image-placeholder.png" // Placeholder image
          alt="Классическая помада"
          width={150}
          height={150}
          className={styles.image}
        />
        <button className={styles.remove_button} aria-label="Удалить товар">
          <TrashIcon />
        </button>
        <h3 className={styles.title}>
          Классическая помада Fior 133 Беспечный розовый
        </h3>
        <span className={styles.sku}>Арт. F23786A5</span>
        <div className={styles.price}>612 ₽</div>
        <Button variant="primary" size="sm" className={styles.add_to_cart}>
          В корзину
        </Button>
      </div>
      <div className={styles.chars}>
        <div className={styles.char_item}>Держится до 10 часов</div>
        <div className={styles.char_item}>Помада</div>
        <div className={styles.char_item}>Франция</div>
        <div className={styles.char_item}>Увлажняющий</div>
        <div className={styles.char_item}>133 Беспечный розовый</div>
      </div>
    </div>
  );
};
