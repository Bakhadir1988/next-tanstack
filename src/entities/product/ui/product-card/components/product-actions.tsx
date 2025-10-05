import { EyeOpenIcon, HeartIcon, LayersIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';

import { Button, Flex } from '@/shared/ui';

import styles from './../product-card.module.scss';

const actionsContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0, // Explicitly no stagger on exit
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
    transition: { type: 'tween', ease: 'easeInOut', duration: 0.18 }, // Explicitly instant
  },
  hover: {
    x: 0,
    transition: { type: 'tween', ease: 'easeInOut', duration: 0.18 },
  },
} as const;

const MotionButton = motion(Button);
const MotionFlex = motion(Flex);

export const ProductActions = () => {
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
