import { forwardRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

import styles from './button.module.scss';
import { ButtonProps } from './button.types';

const button_variants = cva(styles.root, {
  variants: {
    variant: {
      primary: styles.variant_primary,
      secondary: styles.variant_secondary,
      danger: styles.variant_danger,
      outline: styles.variant_outline,
      ghost: styles.variant_ghost,
      icon: styles.variant_icon,
    },
    size: {
      sm: styles.size_sm,
      md: styles.size_md,
      lg: styles.size_lg,
    },
    radius: {
      sm: styles.radius_sm,
      md: styles.radius_md,
      lg: styles.radius_lg,
      xl: styles.radius_xl,
    },
    full_width: {
      true: styles.full_width,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    radius: 'sm',
  },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      radius,
      is_loading,
      full_width,
      asChild,
      icon,
      icon_position = 'left',
      ...props
    },
    ref,
  ) => {
    const has_text = !!children;
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={clsx(
          button_variants({ variant, size, radius, full_width }),
          !asChild && is_loading && styles.is_loading,
          !asChild && icon_position === 'right' && styles.icon_position_right,
          className,
        )}
        disabled={is_loading || props.disabled}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {icon && (
              <span
                className={clsx(
                  styles.icon,
                  has_text && styles.has_text,
                  has_text &&
                    (icon_position === 'left'
                      ? styles.icon_position_left
                      : styles.icon_position_right),
                )}
              >
                {icon}
              </span>
            )}
            {variant !== 'icon' && children}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';
