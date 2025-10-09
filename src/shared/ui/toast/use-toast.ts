import { create } from 'zustand';

import { type ToastProps } from './toast.types';

const TOAST_LIMIT = 4;

type ToastState = {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, 'id'>) => void;
  removeToast: (id: string) => void;
};

export const useToast = create<ToastState>((set, get) => ({
  toasts: [],
  addToast: (toast) => {
    const { toasts } = get();
    const newToast = { ...toast, id: new Date().toISOString() };
    const updatedToasts = [newToast, ...toasts].slice(0, TOAST_LIMIT);
    set({ toasts: updatedToasts });
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
