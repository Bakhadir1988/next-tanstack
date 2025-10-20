'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { ReactNode } from 'react';
import { Controller, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperProps } from 'swiper/react';
import styles from './slider.module.scss';

interface SliderProps extends SwiperProps {
  children: ReactNode;
}

export const Slider = ({ children, ...props }: SliderProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Controller]}
      navigation
      pagination={props.pagination ? props.pagination : false}
      className={styles.slider}
      {...props}
    >
      {children}
    </Swiper>
  );
};
