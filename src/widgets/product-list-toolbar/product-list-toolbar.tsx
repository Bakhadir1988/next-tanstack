'use client';

import { Flex } from '@/shared/ui/flex';
import {
  SegmentControl,
  SegmentControlValue,
} from '@/shared/ui/segment-control';

import styles from './product-list-toolbar.module.scss';

type ProductListToolbarProps = {
  view: SegmentControlValue;
  onViewChangeAction: (view: SegmentControlValue) => void;
  // В будущем здесь могут быть пропсы для сортировки, фильтров и т.д.
  // sortValue: string;
  // onSortChange: (value: string) => void;
};

export const ProductListToolbar = ({
  view,
  onViewChangeAction,
}: ProductListToolbarProps) => {
  return (
    <Flex justify="between" align="center" className={styles.root}>
      {/* В будущем здесь будет компонент сортировки и кнопка "Фильтр" */}
      <span>Сортировка и Фильтр</span>
      <SegmentControl value={view} onValueChangeAction={onViewChangeAction} />
    </Flex>
  );
};
