import { EyeOpenIcon, HeartIcon, LayersIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { favoritesApi, ListResponse } from '@/shared/api/list.api';
import { getSessionId } from '@/shared/api/session.api';
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

export const ProductActions = ({ ...props }) => {
  const sessionId = getSessionId();

  const { item_id } = props;

  const queryKey = ['favorites', sessionId];

  const queryClient = useQueryClient();

  const { data: favoritesData } = useQuery({
    queryKey,
    queryFn: () => favoritesApi.get(sessionId),
    enabled: !!sessionId,
  });

  const addMutation = useMutation({
    mutationFn: () => favoritesApi.add(item_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      console.log('Favorite added successfully');
    },
    onError: (error) => {
      console.error('Error adding favorite:', error);
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => favoritesApi.remove({ item_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      console.log('Favorite removed successfully');
    },
    onError: (error) => {
      console.error('Error removing favorite:', error);
    },
  });

  const isFavorite =
    // Проверяем, что favoritesData - это объект, а не строка ошибки от API
    typeof favoritesData === 'object' &&
    // Безопасно проверяем наличие товара в массиве
    (favoritesData as ListResponse)?.items?.some(
      (item) => item.item_id === item_id,
    );

  console.log(favoritesData);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  return (
    <MotionFlex
      variants={actionsContainerVariants}
      direction="column"
      className={styles.actions}
    >
      <MotionButton
        variant="icon"
        icon={<HeartIcon />}
        className={styles.action_button}
        variants={actionItemVariants}
        onClick={handleToggleFavorite}
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
