'use client';

import * as Toast from '@radix-ui/react-toast';
import { AnimatePresence } from 'framer-motion';

import { ToastUI } from './toast';
import styles from './toast.module.scss';
import { useToast } from './use-toast';

export const ToastProvider = () => {
  const { toasts, removeToast } = useToast();

  return (
    <Toast.Provider swipeDirection="up">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastUI
            key={toast.id}
            {...toast}
            onOpenChange={(open) => {
              if (!open) {
                removeToast(toast.id!);
              }
            }}
          />
        ))}
      </AnimatePresence>
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
};
