import { forwardRef, CSSProperties } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

import styles from './grid.module.scss';
import { GridProps } from './grid.types';

const grid_variants = cva(styles.root, {
  variants: {
    flow: {
      row: styles.flow_row,
      column: styles.flow_column,
      dense: styles.flow_dense,
      'row-dense': styles.flow_row_dense,
      'column-dense': styles.flow_column_dense,
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
    gap: {
      sm: styles.gap_sm,
      md: styles.gap_md,
      lg: styles.gap_lg,
      xl: styles.gap_xl,
    },
    gapX: {
      sm: styles.gap_x_sm,
      md: styles.gap_x_md,
      lg: styles.gap_x_lg,
      xl: styles.gap_x_xl,
    },
    gapY: {
      sm: styles.gap_y_sm,
      md: styles.gap_y_md,
      lg: styles.gap_y_lg,
      xl: styles.gap_y_xl,
    },
  },
  defaultVariants: {
    align: 'stretch',
    justify: 'start',
  },
});

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      asChild,
      style,
      columns,
      rows,
      flow,
      align,
      justify,
      gap,
      gapX,
      gapY,
      isContainer,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div';

    const gridStyle: CSSProperties = {
      gridTemplateColumns: columns,
      gridTemplateRows: rows,
      ...style,
    };

    return (
      <Comp
        ref={ref}
        className={clsx(
          grid_variants({ flow, align, justify, gap, gapX, gapY }),
          isContainer && styles.is_container,
          className,
        )}
        style={gridStyle}
        {...props}
      />
    );
  },
);

Grid.displayName = 'Grid';
