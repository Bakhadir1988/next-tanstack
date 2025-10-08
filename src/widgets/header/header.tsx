'use client';

import {
  HeartIcon,
  MixerHorizontalIcon,
  BackpackIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';

import { useProductListQuery } from '@/features/product/hooks/use-product-list-query';
import { Badge, Flex } from '@/shared/ui';

import styles from './header.module.scss';

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
];

export const Header = () => {
  const { items: favoriteItems } = useProductListQuery({
    queryKey: 'favorites',
  });
  const { items: compareItems } = useProductListQuery({ queryKey: 'compare' });

  const { items: cartItems } = useProductListQuery({ queryKey: 'cart' });

  const favoritesCount = favoriteItems.length;
  const compareCount = compareItems.length;
  const cartCount = cartItems.length;

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
              <span className={styles.action_label}>Корзина</span>
            </Link>

            <Link href="/cart" className={styles.action_link}>
              <div className={styles.icon_wrapper}>
                <BackpackIcon width={24} height={24} />
                {cartCount > 0 && (
                  <Badge className={styles.badge} size="1" radius="full">
                    {cartCount}
                  </Badge>
                )}
              </div>
              <span className={styles.action_label}>Сравнение</span>
            </Link>
          </Flex>
        </Flex>
      </div>
    </header>
  );
};
