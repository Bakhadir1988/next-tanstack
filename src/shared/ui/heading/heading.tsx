import { forwardRef, ElementRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import styles from './heading.module.scss';
import { HeadingProps, HeadingTag } from './heading.types';

const heading_variants = cva(styles.root, {
  variants: {
    size: {
      '1': styles.size_1,
      '2': styles.size_2,
      '3': styles.size_3,
      '4': styles.size_4,
      '5': styles.size_5,
      '6': styles.size_6,
    },
    weight: {
      light: styles.weight_light,
      regular: styles.weight_regular,
      medium: styles.weight_medium,
      semibold: styles.weight_semibold,
      bold: styles.weight_bold,
    },
    align: {
      left: styles.align_left,
      center: styles.align_center,
      right: styles.align_right,
    },
    color: {
      gray: styles.color_gray,
      blue: styles.color_blue,
      green: styles.color_green,
      red: styles.color_red,
    },
    wrap: {
      wrap: styles.wrap_wrap,
      nowrap: styles.wrap_nowrap,
      pretty: styles.wrap_pretty,
      balance: styles.wrap_balance,
    },
    trim: {
      normal: null,
      start: styles.trim_start,
      end: styles.trim_end,
      both: styles.trim_both,
    },
  },
  defaultVariants: {
    size: '3',
  },
});

export const Heading = forwardRef<ElementRef<HeadingTag>, HeadingProps>(
  (
    {
      as: Tag = 'h1',
      asChild,
      className,
      children,
      size,
      weight,
      align,
      trim,
      truncate,
      wrap,
      color,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : Tag;

    return (
      <Comp
        ref={ref}
        className={clsx(
          heading_variants({ size, weight, align, color, wrap, trim }),
          truncate && styles.truncate,
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Heading.displayName = 'Heading';
