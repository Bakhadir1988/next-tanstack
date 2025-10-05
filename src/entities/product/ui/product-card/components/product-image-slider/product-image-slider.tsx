import { useState } from 'react';

import { clsx } from 'clsx';
import Image from 'next/image';

import { NEXT_PUBLIC_IMAGE_URL } from '@/shared/config/site.config';

import styles from './product-image-slider.module.scss';

type ProductImageSliderProps = {
  imgs: string[];
  alt: string;
};

export const ProductImageSlider = ({ imgs, alt }: ProductImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!imgs || imgs.length === 0) {
    return (
      <div className={styles.root}>
        <Image
          className={styles.image}
          src="/image-placeholder.png"
          alt="Product image placeholder"
          width={300}
          height={300}
          priority
        />
      </div>
    );
  }

  const handleStripHover = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const currentImageUrl = NEXT_PUBLIC_IMAGE_URL + imgs[currentIndex];

  return (
    <div className={styles.root}>
      {imgs.length > 1 && (
        <div className={styles.stripsContainer}>
          {imgs.map((_, index) => (
            <div
              key={index}
              className={styles.strip}
              onMouseEnter={() => handleStripHover(index)}
            />
          ))}
        </div>
      )}

      <Image
        className={clsx(styles.image, imgs.length > 1 && styles.with_dots)}
        src={currentImageUrl}
        alt={alt}
        width={300}
        height={300}
        priority
      />

      {imgs.length > 1 && (
        <div className={styles.dots}>
          {imgs.map((_, index) => (
            <span
              key={index}
              className={clsx(styles.dot, {
                [styles.dotActive]: currentIndex === index,
              })}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
