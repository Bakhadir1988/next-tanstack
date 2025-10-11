'use client';

import {
  GridIcon,
  ListBulletIcon,
  DragHandleHorizontalIcon,
} from '@radix-ui/react-icons';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { motion } from 'framer-motion';

import { Tooltip } from '../tooltip';

import styles from './segment-control.module.scss';
import {
  SegmentControlProps,
  SegmentControlValue,
} from './segment-control.types';

const options = [
  { value: 'block', label: 'Блоки', icon: <GridIcon />, title: 'Вид блоком' },
  {
    value: 'row',
    label: 'Список',
    icon: <DragHandleHorizontalIcon />,
    title: 'Вид списком',
  },
  {
    value: 'table',
    label: 'Таблица',
    icon: <ListBulletIcon />,
    title: 'Вид таблицей',
  },
];

export const SegmentControl = ({
  value,
  onValueChangeAction,
}: SegmentControlProps) => {
  const handleValueChange = (newValue: SegmentControlValue) => {
    if (newValue) {
      onValueChangeAction(newValue);
    }
  };

  return (
    <ToggleGroup.Root
      className={styles.root}
      type="single"
      value={value}
      onValueChange={handleValueChange}
      aria-label="Вид отображения списка"
    >
      {options.map((option) => (
        <Tooltip key={option.value} content={option.title} side="top">
          <ToggleGroup.Item
            className={styles.item}
            value={option.value}
            aria-label={option.label}
          >
            {option.value === value && (
              <motion.div
                layoutId="slider"
                className={styles.slider}
                transition={{ duration: 0.2 }}
              />
            )}

            <span className={styles.icon_wrapper}>{option.icon}</span>
          </ToggleGroup.Item>
        </Tooltip>
      ))}
    </ToggleGroup.Root>
  );
};
