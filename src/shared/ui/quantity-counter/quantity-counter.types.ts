import { HTMLAttributes } from 'react';

export interface QuantityCounterProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  onChange?: (value: number) => void;
  initialValue?: number;
}
