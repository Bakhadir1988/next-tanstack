import { forwardRef } from 'react';

import cn from 'clsx';

import styles from './textarea.module.scss';

import type { TextareaProps } from './textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(styles.textarea, className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
