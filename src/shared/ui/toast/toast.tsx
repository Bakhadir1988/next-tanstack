import { type FC } from 'react';

import { Cross2Icon } from '@radix-ui/react-icons';
import * as Toast from '@radix-ui/react-toast';
import Image from 'next/image';
import Link from 'next/link';

import { NEXT_PUBLIC_IMAGE_URL } from '@/shared/config/site.config';

import styles from './toast.module.scss';
import { type ToastProps } from './toast.types';

export const ToastUI: FC<ToastProps> = ({
  title,
  image,
  description,
  ...props
}) => {
  const imageUrl =
    image && image[0]
      ? NEXT_PUBLIC_IMAGE_URL + image[0]
      : '/image-placeholder.png';

  console.log(imageUrl);

  return (
    <Toast.Root {...props} duration={3000} className={styles.root}>
      <Link href="/" className={styles.toast}>
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
      </Link>
      <Toast.Close className={styles.close}>
        <Cross2Icon />
      </Toast.Close>
    </Toast.Root>
  );
};
