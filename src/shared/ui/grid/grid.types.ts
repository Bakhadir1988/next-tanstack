import { HTMLAttributes, ReactNode } from 'react';

// Re-using from Flex as they are identical
import { FlexAlign, FlexJustify, FlexGap } from '@/shared/ui/flex/flex.types';

export type GridFlow =
  | 'row'
  | 'column'
  | 'dense'
  | 'row-dense'
  | 'column-dense';

export type GridProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
  columns?: string; // e.g., '3', 'repeat(3, 1fr)'
  rows?: string; // e.g., '2', 'repeat(2, auto)'
  flow?: GridFlow;
  align?: FlexAlign; // align-items values are the same as for flex
  justify?: FlexJustify; // justify-content values are the same as for flex
  gap?: FlexGap;
  gapX?: FlexGap;
  gapY?: FlexGap;
  asChild?: boolean;
  isContainer?: boolean;
};
