'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Flex } from '../flex';

import styles from './image-lightbox.module.scss';

interface ImageLightboxProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  startIndex?: number;
  alt?: string;
}

export const ImageLightbox = ({
  images,
  isOpen,
  onClose,
  startIndex = 0,
  alt = 'Product Images',
}: ImageLightboxProps) => {
  const [activeIndex, setActiveIndex] = useState(startIndex);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <Flex justify="between" align="center" className={styles.header}>
            <span>
              {activeIndex + 1} / {images.length}
            </span>
            <Dialog.Title>{alt}</Dialog.Title>
            <Dialog.Close asChild>
              <button className={styles.closeButton} aria-label="Close">
                &times;
              </button>
            </Dialog.Close>
          </Flex>
          <Swiper
            initialSlide={startIndex}
            modules={[Navigation]}
            navigation={true}
            loop={true}
            className={styles.swiper}
            onSlideChange={handleSlideChange}
          >
            {images.map((src, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                <Image src={src} alt={`Lightbox image ${index + 1}`} fill />
              </SwiperSlide>
            ))}
          </Swiper>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
