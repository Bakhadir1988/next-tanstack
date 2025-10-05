import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'icon'
  | 'ghost'
  | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonRadius = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  is_loading?: boolean;
  full_width?: boolean;
  asChild?: boolean;
  icon?: ReactNode;
  icon_position?: 'left' | 'right';
};
