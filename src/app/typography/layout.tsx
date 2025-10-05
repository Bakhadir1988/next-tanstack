import { ReactNode } from 'react';

import Link from 'next/link';

import styles from './typography.module.scss';

const menuItems = [
  { href: '/typography/button', label: 'Button' },
  { href: '/typography/flex', label: 'Flex' },
  { href: '/typography/grid', label: 'Grid' },
  { href: '/typography/heading', label: 'Heading' },
  { href: '/typography/text', label: 'Text' },
  { href: '/typography/badge', label: 'Badge' },
  { href: '/typography/tooltip', label: 'Tooltip' },
  { href: '/typography/product-list', label: 'ProductList' },
  { href: '/typography/input', label: 'Input' },
  { href: '/typography/textarea', label: 'Textarea' },
  { href: '/typography/quantity-counter', label: 'QuantityCounter' },
];

export default function TypographyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav>
          {menuItems.map((item) => (
            <Link href={item.href} key={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
