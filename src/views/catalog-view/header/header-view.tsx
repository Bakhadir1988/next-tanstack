'use client';

import Link from 'next/link';

import { useFavoritesQuery } from '@/entities/favorite/model/useFavorites';

// Этот компонент принимает начальное значение, но также подписывается на обновления
export const HeaderView = ({ initialCount }: { initialCount: number }) => {
  // Хук нужен для получения обновлений на клиенте после мутаций
  const { items } = useFavoritesQuery({});

  // Для первого рендера используем initialCount, для последующих - актуальную длину items.
  // Оператор ?? говорит: "если items undefined, используй initialCount"
  const favoritesCount = items?.length ?? initialCount;

  return (
    <header>
      <Link href="/">Главная</Link>
      <Link href="/catalog/">Каталог</Link>
      <Link href="/favorites/">Избранное ({favoritesCount})</Link>
    </header>
  );
};
