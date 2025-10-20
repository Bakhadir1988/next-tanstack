'use client';

import { ProductType } from '@/entities/product/model/product.type';
import { CompareProductCard } from '@/entities/product/ui/compare-product-card';
import { Flex } from '@/shared/ui';
import { Slider } from '@/shared/ui/slider';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import { SwiperSlide } from 'swiper/react';
import { CompareGridSkeleton } from './compare-grid-skeleton';
import styles from './compare-grid.module.scss';

type CompareGridWidgetProps = {
  items: ProductType[];
};

export const CompareGridWidget = ({ items }: CompareGridWidgetProps) => {
  const [productsSwiper, setProductsSwiper] = useState<SwiperCore | null>(null);
  const [charsSwiper, setCharsSwiper] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (
      productsSwiper &&
      !productsSwiper.destroyed &&
      charsSwiper &&
      !charsSwiper.destroyed
    ) {
      productsSwiper.controller.control = charsSwiper;
      charsSwiper.controller.control = productsSwiper;
      setIsInitialized(true);
    }
  }, [productsSwiper, charsSwiper]);

  // Создаем моковые данные для характеристик
  const mockCharacteristics = items.map((_, i) => [
    `Держится до ${10 + i} часов`,
    'Помада',
    'Франция',
    'Увлажняющий',
    `${133 + i} Беспечный розовый`,
  ]);

  const characteristics_names = [
    'Дополнительно',
    'Тип',
    'Страна производства',
    'Эффект',
    'Цвет',
  ];

  const sliderOptions = {
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      1280: {
        slidesPerView: 6,
      },
    },
  };

  return (
    <>
      {!isInitialized && <CompareGridSkeleton />}
      <div
        className={styles.root}
        style={{ visibility: isInitialized ? 'visible' : 'hidden' }}
      >
        <Slider
          {...sliderOptions}
          onSwiper={setProductsSwiper}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className={styles.products_row}
        >
          {items.map((item) => (
            <SwiperSlide key={item.item_id}>
              <CompareProductCard product={item} />
            </SwiperSlide>
          ))}
        </Slider>
        <Slider
          {...sliderOptions}
          onSwiper={setCharsSwiper}
          navigation={false}
          className={styles.characteristics_grid}
        >
          {mockCharacteristics.map((productChars, productIndex) => (
            <SwiperSlide key={productIndex}>
              <div className={styles.product_chars_column}>
                {productChars.map((char_value, index) => (
                  <Flex
                    direction="column"
                    key={index}
                    className={styles.char_value_item}
                  >
                    <span
                      className={clsx(
                        styles.char_name,
                        productIndex === activeIndex
                          ? styles.char_name_first
                          : styles.char_name_hidden,
                      )}
                    >
                      {characteristics_names[index]}
                    </span>
                    <span className={styles.char_value}>{char_value}</span>
                  </Flex>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </>
  );
};
