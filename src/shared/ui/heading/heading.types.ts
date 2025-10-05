import { HTMLAttributes } from 'react';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingSize = '1' | '2' | '3' | '4' | '5' | '6';
export type HeadingWeight =
  | 'light'
  | 'regular'
  | 'medium'
  | 'semibold'
  | 'bold';
export type HeadingAlign = 'left' | 'center' | 'right';
export type HeadingTrim = 'normal' | 'start' | 'end' | 'both';
export type HeadingWrap = 'wrap' | 'nowrap' | 'pretty' | 'balance';
export type HeadingColor = 'gray' | 'blue' | 'green' | 'red'; // Example colors

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag;
  asChild?: boolean;
  size?: HeadingSize;
  weight?: HeadingWeight;
  align?: HeadingAlign;
  trim?: HeadingTrim;
  truncate?: boolean;
  wrap?: HeadingWrap;
  color?: HeadingColor;
  className?: string;
}
