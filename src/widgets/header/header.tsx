'use client';

import {
  HeartIcon,
  MixerHorizontalIcon,
  BackpackIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

import { useCompareQuery } from '@/features/compare/hooks/useCompare';
import { useFavoritesQuery } from '@/features/favorite/hooks/useFavorites';
import { Badge, Flex } from '@/shared/ui';

import styles from './header.module.scss';

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
];

// Remove favorites from this static array to handle it dynamically
const otherActionLinks = [
  {
    href: '/cart',
    label: 'Корзина',
    icon: <BackpackIcon width={24} height={24} />,
  },
];

export const Header = () => {
  const { items: favoriteItems } = useFavoritesQuery({});
  const { items: compareItems } = useCompareQuery({});

  const favoritesCount = favoriteItems.length;
  const compareCount = compareItems.length;

  return (
    <header className={styles.header}>
      <div className="container">
        <Flex justify="between">
          <div className={styles.left_section}>
            <Link href="/" className={styles.logo}>
              <span>Лого</span>
            </Link>
            <nav className={styles.nav}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.nav_link}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Flex align="center" className={styles.right_section}>
            <Link href="/favorites" className={styles.action_link}>
              <div className={styles.icon_wrapper}>
                <HeartIcon width={24} height={24} />
                {favoritesCount > 0 && (
                  <Badge className={styles.badge} size="1" radius="full">
                    {favoritesCount}
                  </Badge>
                )}
              </div>
              <span className={styles.action_label}>Избранное</span>
            </Link>

            <Link href="/compare" className={styles.action_link}>
              <div className={styles.icon_wrapper}>
                <MixerHorizontalIcon width={24} height={24} />
                {compareCount > 0 && (
                  <Badge className={styles.badge} size="1" radius="full">
                    {compareCount}
                  </Badge>
                )}
              </div>
              <span className={styles.action_label}>Сравнение</span>
            </Link>

            {otherActionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.action_link}
              >
                {link.icon}
                <span className={styles.action_label}>{link.label}</span>
              </Link>
            ))}
          </Flex>
        </Flex>
      </div>
    </header>
  );
};
