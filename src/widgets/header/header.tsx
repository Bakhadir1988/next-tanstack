'use client';

import {
  HeartIcon,
  MixerHorizontalIcon,
  BackpackIcon,
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useProductListMutation } from '@/features/product/hooks/use-product-list-mutation';
import { useProductListQuery } from '@/features/product/hooks/use-product-list-query';
import { favoritesApi, compareApi, cartApi } from '@/shared/api/list.api';
import { Badge, Flex } from '@/shared/ui';
import { Dropdown } from '@/shared/ui/dropdown';
import { ProductListDropdown } from '@/widgets/product-list-dropdown';

import styles from './header.module.scss';

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
];

export const Header = () => {
  const router = useRouter();

  const { items: favoriteItems } = useProductListQuery({
    queryKey: 'favorites',
  });
  const { items: compareItems } = useProductListQuery({ queryKey: 'compare' });
  const { items: cartItems } = useProductListQuery({ queryKey: 'cart' });

  const { toggle: toggleFavorite } = useProductListMutation({
    queryKey: 'favorites',
    api: favoritesApi,
  });

  const { toggle: toggleCompare } = useProductListMutation({
    queryKey: 'compare',
    api: compareApi,
  });

  const { toggle: toggleCart } = useProductListMutation({
    queryKey: 'cart',
    api: cartApi,
  });

  const favoritesCount = favoriteItems.length;
  const compareCount = compareItems.length;
  const cartCount = cartItems.length;

  const totalCartPrice = cartItems
    .reduce((sum, item) => sum + (parseFloat(item.price || '0') || 0), 0)
    .toFixed(0);

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
            <Dropdown
              trigger={
                <div
                  className={styles.action_link}
                  onClick={() => router.push('/favorites')}
                >
                  <div className={styles.icon_wrapper}>
                    <HeartIcon width={24} height={24} />
                    {favoritesCount > 0 && (
                      <Badge className={styles.badge} size="1" radius="full">
                        {favoritesCount}
                      </Badge>
                    )}
                  </div>
                  <span className={styles.action_label}>Избранное</span>
                </div>
              }
            >
              <ProductListDropdown
                products={favoriteItems}
                onRemove={(productId) => {
                  const product = favoriteItems.find(
                    (p) => p.item_id === productId,
                  );
                  if (product) toggleFavorite({ product });
                }}
                emptyIcon={<HeartIcon width={40} height={40} />}
                emptyTitle="Нет товаров в избранном"
                emptyDescription="Добавьте товары в избранное"
                actionLabel="В избранное"
                actionHref="/favorites"
              />
            </Dropdown>

            <Dropdown
              trigger={
                <div
                  className={styles.action_link}
                  onClick={() => router.push('/compare')}
                >
                  <div className={styles.icon_wrapper}>
                    <MixerHorizontalIcon width={24} height={24} />
                    {compareCount > 0 && (
                      <Badge className={styles.badge} size="1" radius="full">
                        {compareCount}
                      </Badge>
                    )}
                  </div>
                  <span className={styles.action_label}>Сравнение</span>
                </div>
              }
            >
              <ProductListDropdown
                products={compareItems}
                onRemove={(productId) => {
                  const product = compareItems.find(
                    (p) => p.item_id === productId,
                  );
                  if (product) toggleCompare({ product });
                }}
                emptyIcon={<MixerHorizontalIcon width={40} height={40} />}
                emptyTitle="Нет товаров в сравнении"
                emptyDescription="Добавьте товары для сравнения"
                actionLabel="В сравнение"
                actionHref="/compare"
              />
            </Dropdown>

            <Dropdown
              trigger={
                <div
                  className={styles.action_link}
                  onClick={() => router.push('/cart')}
                >
                  <div className={styles.icon_wrapper}>
                    <BackpackIcon width={24} height={24} />
                    {cartCount > 0 && (
                      <Badge className={styles.badge} size="1" radius="full">
                        {cartCount}
                      </Badge>
                    )}
                  </div>
                  <span className={styles.action_label}>Корзина</span>
                </div>
              }
            >
              <ProductListDropdown
                products={cartItems}
                onRemove={(productId) => {
                  const product = cartItems.find(
                    (p) => p.item_id === productId,
                  );
                  if (product) toggleCart({ product });
                }}
                emptyIcon={<BackpackIcon width={40} height={40} />}
                emptyTitle="Нет товаров в корзине"
                emptyDescription="Добавьте товары в корзину"
                actionLabel="В корзину"
                actionHref="/cart"
                totalPrice={cartCount > 0 ? `${totalCartPrice} ₽` : undefined}
              />
            </Dropdown>
          </Flex>
        </Flex>
      </div>
    </header>
  );
};
