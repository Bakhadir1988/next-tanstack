import { HTMLAttributes } from 'react';

export interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  rating: string | null;
}
