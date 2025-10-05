'use client';

import { useState } from 'react';

import cn from 'clsx';

import { Button } from '../button';
import { Input } from '../input';

import styles from './quantity-counter.module.scss';
import { QuantityCounterProps } from './quantity-counter.types';

export const QuantityCounter = ({
  value: controlledValue,
  onChange,
  initialValue = 1,
  className,
  ...props
}: QuantityCounterProps) => {
  const [internalValue, setInternalValue] = useState(initialValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const triggerChange = (newValue: number) => {
    if (onChange) {
      onChange(newValue);
    }
    if (!isControlled) {
      setInternalValue(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = value + 1;
    triggerChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = value > 1 ? value - 1 : 1;
    triggerChange(newValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      triggerChange(newValue);
    }
  };

  return (
    <div className={cn(styles.root, className)} {...props}>
      <Button onClick={handleDecrement} className={styles.button}>
        -
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
      <Button onClick={handleIncrement} className={styles.button}>
        +
      </Button>
    </div>
  );
};
