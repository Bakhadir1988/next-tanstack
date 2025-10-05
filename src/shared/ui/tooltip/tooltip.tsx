'use client';

import React from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import clsx from 'clsx';

import styles from './tooltip.module.scss';
import { TooltipProps } from './tooltip.types';

export const Tooltip = ({
  children,
  content,
  className,
  // Radix props with sensible defaults
  open,
  defaultOpen,
  onOpenChange,
  delayDuration = 200,
  sideOffset = 4,
  ...contentProps
}: TooltipProps) => {
  // A tooltip without content is not useful
  if (!content) {
    return <>{children}</>;
  }

  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        delayDuration={delayDuration}
      >
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={clsx(styles.content, className)}
            sideOffset={sideOffset}
            {...contentProps}
          >
            {content}
            <TooltipPrimitive.Arrow className={styles.arrow} />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

Tooltip.displayName = 'Tooltip';
