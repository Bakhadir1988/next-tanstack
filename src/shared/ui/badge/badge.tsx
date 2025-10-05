import React from 'react';

import { cva } from 'class-variance-authority';
import clsx from 'clsx';

import styles from './badge.module.scss';
import { BadgeProps } from './badge.types';

const badge_variants = cva(styles.root, {
  variants: {
    variant: {
      solid: styles.variant_solid,
      outline: styles.variant_outline,
    },
    size: {
      '1': styles.size_1,
      '2': styles.size_2,
      '3': styles.size_3,
    },
    radius: {
      none: styles.radius_none,
      small: styles.radius_small,
      medium: styles.radius_medium,
      large: styles.radius_large,
      full: styles.radius_full,
    },
    color: {
      gray: styles.color_gray,
      green: styles.color_green,
      purple: styles.color_purple,
      red: styles.color_red,
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: '1',
    radius: 'small',
    color: 'gray',
  },
});

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      children,
      size,
      variant,
      color,
      highContrast,
      radius,
      ...props
    },
    ref,
  ) => {
    return (
      <span // Always renders a span
        ref={ref}
        className={clsx(
          badge_variants({ variant, size, radius, color }),
          { [styles.highContrast]: highContrast },
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
