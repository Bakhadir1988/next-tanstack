'use client';

import { ReactNode, useState, useRef, useEffect } from 'react';

import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './dropdown.module.scss';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Dropdown = ({ trigger, children, className }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className={clsx(styles.dropdown, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.trigger}>{trigger}</div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="dropdown-content"
            className={styles.dropdown_content}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div className={styles.dropdown_inner}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
