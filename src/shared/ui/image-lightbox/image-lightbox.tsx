'use client';

import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './image-lightbox.module.scss';

interface ImageLightboxProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  startIndex?: number;
}

export const ImageLightbox = ({
  images,
  isOpen,
  onClose,
  startIndex = 0,
}: ImageLightboxProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Swiper
            initialSlide={startIndex}
            modules={[Navigation]}
            navigation={true}
            loop={true}
            className={styles.swiper}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                <Image
                  src={src}
                  alt={`Lightbox image ${index + 1}`}
                  layout="fill"
                  objectFit="contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Dialog.Close asChild>
            <button className={styles.closeButton} aria-label="Close">
              &times;
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
