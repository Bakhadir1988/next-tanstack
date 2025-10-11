import { useState } from 'react';

import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { NEXT_PUBLIC_IMAGE_URL } from '@/shared/config/site.config';

import styles from './product-image-slider.module.scss';

type ProductImageSliderProps = {
  imgs: string[];
  alt: string;
  url: string;
  width?: number;
  height?: number;
  className?: string;
};

export const ProductImageSlider = ({
  imgs,
  alt,
  url,
  width = 300,
  height = 300,
  className,
}: ProductImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!imgs || imgs.length === 0) {
    return (
      <div className={styles.root}>
        <Image
          className={styles.image}
          src="/image-placeholder.png"
          alt="Product image placeholder"
          width={width}
          height={height}
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
    <Link href={url} className={clsx(styles.root, className)}>
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
        width={width}
        height={width}
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
    </Link>
  );
};
