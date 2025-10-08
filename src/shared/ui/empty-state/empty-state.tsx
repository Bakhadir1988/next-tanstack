import { ReactNode } from 'react';

import Link from 'next/link';

import { Button, Heading } from '@/shared/ui';

import styles from './empty-state.module.scss';

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.icon}>{icon}</div>
      <Heading as="h3" size="4">
        {title}
      </Heading>
      <p className={styles.description}>{description}</p>
      <Button asChild>
        <Link href="/catalog">Каталог</Link>
      </Button>
    </div>
  );
};
