import { forwardRef } from 'react';

import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';

import styles from './stock-status.module.scss';
import { StockStatusProps } from './stock-status.types';

export const StockStatus = forwardRef<HTMLSpanElement, StockStatusProps>(
  ({ in_stock, className, ...props }, ref) => {
    const isAvailable = in_stock === '1';

    const statusClassName = clsx(
      styles.root,
      isAvailable ? styles.in_stock : styles.out_of_stock,
      className,
    );

    return (
      <span ref={ref} className={statusClassName} {...props}>
        {isAvailable ? <CheckCircledIcon /> : <CrossCircledIcon />}
        {isAvailable ? 'В наличии' : 'Нет в наличии'}
      </span>
    );
  },
);

StockStatus.displayName = 'StockStatus';
