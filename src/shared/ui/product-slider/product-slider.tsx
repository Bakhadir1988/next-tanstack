'use client';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { useState } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { NEXT_PUBLIC_IMAGE_URL } from '@/shared/config/site.config';

import { Flex } from '../flex';
import { ImageLightbox } from '../image-lightbox'; // Import the lightbox

import styles from './product-slider.module.scss';

import type { Swiper as SwiperType } from 'swiper';

interface ProductSliderProps {
  images: string[];
  className?: string;
}

export const ProductSlider = ({ images, className }: ProductSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Flex
        direction={'row'}
        gap={'md'}
        className={clsx(styles.root, className)}
      >
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          loop={true}
          spaceBetween={10}
          slidesPerView={7}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.thumbs_swiper}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className={styles.thumb_slide}>
              <Image
                src={NEXT_PUBLIC_IMAGE_URL + image}
                alt={`Thumbnail ${index + 1}`}
                width={64}
                height={64}
                className={styles.thumbImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={styles.swiper}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleImageClick(index)}
              className={styles.mainSlide}
            >
              <Image
                src={NEXT_PUBLIC_IMAGE_URL + image}
                alt={`Slide ${index + 1}`}
                width={500}
                height={500}
                className={styles.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images.map((img) => NEXT_PUBLIC_IMAGE_URL + img)}
        startIndex={selectedImageIndex}
      />
    </>
  );
};
