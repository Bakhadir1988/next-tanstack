import { forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

import styles from './flex.module.scss';
import { FlexProps } from './flex.types';

const flex_variants = cva(styles.root, {
  variants: {
    direction: {
      row: styles.direction_row,
      column: styles.direction_column,
      'row-reverse': styles.direction_row_reverse,
      'column-reverse': styles.direction_column_reverse,
    },
    align: {
      start: styles.align_start,
      center: styles.align_center,
      end: styles.align_end,
      stretch: styles.align_stretch,
      baseline: styles.align_baseline,
    },
    justify: {
      start: styles.justify_start,
      center: styles.justify_center,
      end: styles.justify_end,
      between: styles.justify_between,
      around: styles.justify_around,
    },
    wrap: {
      nowrap: styles.wrap_nowrap,
      wrap: styles.wrap_wrap,
      'wrap-reverse': styles.wrap_wrap_reverse,
    },
    gap: {
      sm: styles.gap_sm,
      md: styles.gap_md,
      lg: styles.gap_lg,
      xl: styles.gap_xl,
    },
  },
  defaultVariants: {
    direction: 'row',
  },
});

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    { className, asChild, direction, align, justify, wrap, gap, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className={clsx(
          flex_variants({ direction, align, justify, wrap, gap }),
          className,
        )}
        {...props}
      />
    );
  },
);

Flex.displayName = 'Flex';
