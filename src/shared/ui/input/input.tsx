import { forwardRef } from 'react';

import cn from 'clsx';

import styles from './input.module.scss';

import type { InputProps } from './input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input className={cn(styles.input, className)} ref={ref} {...props} />
    );
  },
);

Input.displayName = 'Input';
