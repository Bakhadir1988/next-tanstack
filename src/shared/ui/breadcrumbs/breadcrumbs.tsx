import { ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Fragment } from 'react';
import styles from './breadcrumbs.module.scss';

// This component will receive props with breadcrumb data in the future.
// For now, it's a static layout.
export const Breadcrumbs = () => {
  const items = [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/catalog/' },
    { label: 'Сравнение товаров', href: '/compare/' },
  ];

  return (
    <nav aria-label="Breadcrumb" className={styles.root}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={item.href}>
              <li className={styles.item}>
                {isLast ? (
                  <span className={styles.current_page} aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                )}
              </li>
              {!isLast && (
                <li className={styles.separator} aria-hidden="true">
                  <ChevronRightIcon />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
