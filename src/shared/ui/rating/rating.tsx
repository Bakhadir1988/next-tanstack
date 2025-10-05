import { forwardRef } from 'react';

import { StarFilledIcon } from '@radix-ui/react-icons';
import { clsx } from 'clsx';

import { Flex } from '../flex';

import styles from './rating.module.scss';
import { RatingProps } from './rating.types';

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  ({ rating, className, ...props }, ref) => {
    return (
      <Flex
        align="center"
        ref={ref}
        className={clsx(styles.rating, className)}
        {...props}
      >
        <StarFilledIcon
          className={clsx(styles.icon, rating && styles.active)}
          width={16}
          height={18}
        />
        <span>{rating ? rating : 0}</span>
      </Flex>
    );
  },
);

Rating.displayName = 'Rating';
