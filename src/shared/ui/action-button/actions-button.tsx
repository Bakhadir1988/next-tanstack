import clsx from 'clsx';

import { Button } from '../button';

import styles from './action-button.module.css';

type ActionButtonProps = {
  onClick: () => void;
  className?: string;
  titleActive: string;
  titleInactive: string;
  disabled?: boolean;
  icon: React.ReactNode;
  isActive?: boolean;
};

export const ActionButton = ({
  onClick,
  className,
  titleActive,
  titleInactive,
  disabled,
  icon,
  isActive,
}: ActionButtonProps) => {
  const currentTitle = isActive ? titleActive : titleInactive;

  return (
    <Button
      variant="icon"
      icon={icon}
      onClick={onClick}
      className={clsx(className, styles.root, isActive && styles.active)}
      title={currentTitle}
      disabled={disabled}
      aria-label={currentTitle}
    />
  );
};
