'use client';

import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';
import { ProductType } from '@/entities/product/model/product.type';
import { CompareProductCard } from '@/entities/product/ui/compare-product-card';
import { CompareProductCharacteristics } from '@/entities/product/ui/components/comapre-product-characteristics/comapre-product-characteristics';
import { transformProductProperties } from '@/shared/lib/transform-product-properties';
import { Button } from '@/shared/ui/button';
import { Slider } from '@/shared/ui/slider';
import { useEffect, useMemo, useState } from 'react';
import SwiperCore from 'swiper';
import { SwiperSlide } from 'swiper/react';
import { CompareGridSkeleton } from './compare-grid-skeleton';
import styles from './compare-grid.module.scss';

type CompareGridWidgetProps = {
  items: ProductType[];
  map?: CatalogMap;
};

export const CompareGridWidget = ({ items, map }: CompareGridWidgetProps) => {
  const [productsSwiper, setProductsSwiper] = useState<SwiperCore | null>(null);
  const [charsSwiper, setCharsSwiper] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);

  const allCharacteristicTitles = useMemo(() => {
    if (!items) return [];
    const allCharsByProduct = items.map((item) =>
      transformProductProperties(item, map),
    );
    const allTitles = new Set<string>();
    allCharsByProduct.flat().forEach((char) => allTitles.add(char.title));
    return Array.from(allTitles);
  }, [items, map]);

  const differingCharacteristics = useMemo(() => {
    if (!items || items.length < 2) {
      return new Set<string>();
    }

    const allCharsByProduct = items.map((item) =>
      transformProductProperties(item, map),
    );

    const differences = new Set<string>();

    allCharacteristicTitles.forEach((title) => {
      let firstValue: string | string[] | null = null;
      let isFirst = true;
      let hasDifference = false;

      for (const productChars of allCharsByProduct) {
        const char = productChars.find((c) => c.title === title);
        const value =
          char && char.value
            ? Array.isArray(char.value)
              ? char.value.join(',')
              : char.value
            : null;

        if (isFirst) {
          firstValue = value;
          isFirst = false;
        } else if (value !== firstValue) {
          hasDifference = true;
          break;
        }
      }

      if (hasDifference) {
        differences.add(title);
      }
    });

    return differences;
  }, [items, map, allCharacteristicTitles]);

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

  const sliderOptions = {
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      1280: {
        slidesPerView: 5,
      },
    },
  };

  return (
    <>
      <div className={styles.toolbar}>
        <Button
          variant="ghost"
          onClick={() => setShowOnlyDifferences((prev) => !prev)}
        >
          {showOnlyDifferences ? 'Показать все' : 'Только различия'}
        </Button>
      </div>
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
          spaceBetween={0}
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
          spaceBetween={0}
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.item_id}>
              <div className={styles.product_chars_column}>
                <CompareProductCharacteristics
                  product={item}
                  map={map}
                  showTitle={index === activeIndex}
                  showOnlyDifferences={showOnlyDifferences}
                  differingCharacteristics={differingCharacteristics}
                  allCharacteristicTitles={allCharacteristicTitles}
                />
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </>
  );
};
