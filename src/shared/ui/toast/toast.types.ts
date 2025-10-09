import { type ComponentProps } from 'react';

import * as Toast from '@radix-ui/react-toast';

export type ToastProps = ComponentProps<typeof Toast.Root> & {
  title: string;
  description?: string;
  image?: string[];
  href?: string;
};
