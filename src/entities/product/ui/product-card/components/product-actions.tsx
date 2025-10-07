'use client';

import { EyeOpenIcon, HeartIcon, LayersIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { ProductType } from '@/entities/product/model/product.type';
import { useProductListMutation } from '@/features/product/hooks/use-product-list-mutation';
import { Button, Flex } from '@/shared/ui';

import styles from './../product-card.module.scss';

const actionsContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0,
    },
  },
  hover: {
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
} as const;

const actionItemVariants = {
  initial: {
    x: '100%',
    transition: { type: 'tween', ease: 'easeInOut', duration: 0.18 },
  },
  hover: {
    x: 0,
    transition: { type: 'tween', ease: 'easeInOut', duration: 0.18 },
  },
} as const;

const MotionButton = motion(Button);
const MotionFlex = motion(Flex);

type ProductActionsProps = {
  product: ProductType;
  isFavorite?: boolean;
};

export const ProductActions = ({
  product,
  isFavorite,
}: ProductActionsProps) => {
  const {
    toggle,
    isInList: isInListFromHook,
    isLoading,
  } = useProductListMutation({
    product: product,
    queryKey: 'favorites',
  });

  // Отдаем приоритет пропсу isFavorite, если он есть (для SSR)
  // Иначе используем значение из хука (для CSR)
  const finalIsInList = isFavorite ?? isInListFromHook;

  return (
    <MotionFlex
      variants={actionsContainerVariants}
      direction="column"
      className={styles.actions}
    >
      <MotionButton
        variant="icon"
        icon={<HeartIcon />}
        onClick={() => toggle()}
        className={clsx(
          styles.action_button,
          finalIsInList && styles.action_button_active,
        )}
        title={finalIsInList ? 'Убрать из избранного' : 'Добавить в избранное'}
        disabled={isLoading}
      />
      <MotionButton
        variant="icon"
        icon={<LayersIcon />}
        className={styles.action_button}
        variants={actionItemVariants}
      />
      <MotionButton
        variant="icon"
        icon={<EyeOpenIcon />}
        className={styles.action_button}
        variants={actionItemVariants}
      />
    </MotionFlex>
  );
};
