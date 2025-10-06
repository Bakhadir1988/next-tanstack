'use client';

import Link from 'next/link';

import { useFavorites } from '@/entities/favorite';

export const Header = () => {
  const { favorites } = useFavorites();

  const favoriteCount = favorites.length;

  return (
    <header>
      <Link href="/">Главная</Link>
      <Link href="/catalog/">Каталог</Link>
      <Link href="/favorites/">Избранное ({favoriteCount})</Link>
    </header>
  );
};
