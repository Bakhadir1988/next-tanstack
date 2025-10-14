import { useState } from 'react';

import { clsx } from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { NEXT_PUBLIC_IMAGE_URL } from '@/shared/config/site.config';

import { ProductType } from '@/entities/product/model/product.type';
import styles from './product-image-slider.module.scss';

type ProductImageSliderProps = {
  product: ProductType;
  width?: number;
  height?: number;
  className?: string;
};

export const ProductImageSlider = ({
  product,
  width = 300,
  height = 300,
  className,
}: ProductImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product.imgs || product.imgs.length === 0) {
    return (
      <div className={styles.root}>
        <Image
          className={styles.image}
          src="/image-placeholder.png"
          alt="Product image placeholder"
          width={width}
          height={height}
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

  const currentImageUrl = NEXT_PUBLIC_IMAGE_URL + product.imgs[currentIndex];

  return (
    <Link href={product.url} className={clsx(styles.root, className)}>
      {product.imgs.length > 1 && (
        <div className={styles.strips}>
          {product.imgs.map((_, index) => (
            <div
              key={index}
              className={styles.strip}
              onMouseEnter={() => handleStripHover(index)}
            />
          ))}
        </div>
      )}

      <Image
        className={clsx(
          styles.image,
          product.imgs.length > 1 && styles.with_dots,
        )}
        src={currentImageUrl}
        alt={product.title}
        width={width}
        height={height}
      />

      {product.imgs.length > 1 && (
        <div className={styles.dots}>
          {product.imgs.map((_, index) => (
            <span
              key={index}
              className={clsx(styles.dot, {
                [styles.dot_active]: currentIndex === index,
              })}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}
    </Link>
  );
};
