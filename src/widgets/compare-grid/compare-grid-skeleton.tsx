import { Flex, Grid } from '@/shared/ui';
import styles from './compare-grid-skeleton.module.scss';

export const CompareGridSkeleton = () => {
  const productSkeletons = Array.from({ length: 6 });
  const charSkeletons = Array.from({ length: 5 }); // 5 characteristics per product

  return (
    <div className={styles.root}>
      <Grid className={styles.products_row}>
        {productSkeletons.map((_, i) => (
          <div key={i} className={styles.product_skeleton} />
        ))}
      </Grid>
      <Grid className={styles.characteristics_grid}>
        {productSkeletons.map((_, i) => (
          <div key={i} className={styles.product_chars_column}>
            {charSkeletons.map((_, j) => (
              <Flex
                direction="column"
                key={j}
                className={styles.char_value_item}
              >
                <div className={styles.char_name_skeleton} />
                <div className={styles.char_value_skeleton} />
              </Flex>
            ))}
          </div>
        ))}
      </Grid>
    </div>
  );
};
