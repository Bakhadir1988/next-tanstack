import { CompareProductCard } from '@/entities/product/ui/compare-product-card';
import styles from './compare-grid.module.scss';

// This component will receive props with characteristics and products.
// For now, it's a static layout.
export const CompareGridWidget = () => {
  const characteristics = [
    'Дополнительно',
    'Тип',
    'Страна производства',
    'Эффект',
    'Цвет',
  ];

  return (
    <div className={styles.root}>
      <div className={styles.characteristics_column}>
        <div className={styles.char_header_empty} />
        {characteristics.map((char) => (
          <div key={char} className={styles.char_item}>
            {char}
          </div>
        ))}
      </div>
      <div className={styles.products_container}>
        {/* Hardcoded 3 product cards for layout purposes */}
        <CompareProductCard />
        <CompareProductCard />
        <CompareProductCard />
      </div>
    </div>
  );
};
