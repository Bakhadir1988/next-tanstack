'use client';

import * as Toast from '@radix-ui/react-toast';

import { ToastUI } from './toast';
import styles from './toast.module.scss';
import { useToast } from './use-toast';

export const ToastProvider = () => {
  const { toasts, removeToast } = useToast();

  return (
    <Toast.Provider swipeDirection="right">
      {toasts.map((toast) => (
        <ToastUI
          key={toast.id}
          {...toast}
          onOpenChange={(open) => {
            if (!open) {
              setTimeout(() => {
                removeToast(toast.id!);
              }, 100);
            }
          }}
        />
      ))}
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
};
