import { HTMLAttributes } from 'react';

export type BadgeSize = '1' | '2' | '3';
export type BadgeVariant = 'solid' | 'outline';
export type BadgeColor = 'gray' | 'purple' | 'green' | 'red';
export type BadgeRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

// Simple, non-polymorphic props based on HTMLSpanElement
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size?: BadgeSize;
  variant?: BadgeVariant;
  color?: BadgeColor;
  highContrast?: boolean;
  radius?: BadgeRadius;
}
