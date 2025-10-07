'use client';
import Link from 'next/link';

import { useFavoritesQuery } from '@/entities/favorite/hooks/useFavorites';

export const Header = () => {
  // Хук просто вызывается здесь. Он получит данные, которые предзагрузил layout.
  const { items } = useFavoritesQuery();
  const favoritesCount = items.length;

  return (
    <header>
      <Link href="/">Главная</Link>
      <Link href="/catalog/">Каталог</Link>
      <Link href="/favorites/">Избранное ({favoritesCount})</Link>
    </header>
  );
};
