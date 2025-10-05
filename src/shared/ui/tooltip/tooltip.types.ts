import { ComponentProps, ReactNode } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

// Expose Radix props for customization, and add our own `content` prop.
export type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root> &
  ComponentProps<typeof TooltipPrimitive.Content> & {
    children: ReactNode;
    content: ReactNode;
  };
