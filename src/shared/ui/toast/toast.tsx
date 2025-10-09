import { type FC } from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import * as Toast from '@radix-ui/react-toast';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { NEXT_PUBLIC_IMAGE_URL } from '@/shared/config/site.config';

import styles from './toast.module.scss';
import { type ToastProps } from './toast.types';

export const ToastUI: FC<ToastProps> = ({
  title,
  image,
  description,
  href,
  ...props
}) => {
  const imageUrl =
    image && image[0]
      ? NEXT_PUBLIC_IMAGE_URL + image[0]
      : '/image-placeholder.png';

  const content = (
    <>
      {image && (
        <div className={styles.image}>
          <Image width={40} height={40} src={imageUrl} alt={title} />
        </div>
      )}
      <div className={styles.content}>
        <Toast.Title className={styles.title}>{title}</Toast.Title>
        <Toast.Description className={styles.description}>
          {description}
        </Toast.Description>
      </div>
    </>
  );

  return (
    <Toast.Root asChild {...props} duration={3000}>
      <motion.div
        layout
        initial={{ opacity: 0, y: 0, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0 }}
        className={styles.root}
      >
        {href ? (
          <Link href={href} className={styles.toast}>
            {content}
          </Link>
        ) : (
          <div className={styles.toast}>{content}</div>
        )}
        <Toast.Close className={styles.close}>
          <Cross2Icon />
        </Toast.Close>
      </motion.div>
    </Toast.Root>
  );
};
