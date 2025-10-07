// src/app/favorites/page.tsx

import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers'; // <--- Импортируем cookies

import { favoritesApi, ListResponse } from '@/shared/api/list.api';
import { ListProductType } from '@/shared/types/list.product.type';
import { FavoritesView } from '@/views/catalog-view/favorites/favorites';

export default async function FavoritesPage() {
  const queryClient = new QueryClient();

  // 1. Правильно получаем sessionId из cookies на сервере
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;

  let initialItems: ListProductType[] = [];

  // 2. Запрашиваем данные, только если sessionId существует
  if (sessionId) {
    const initialData = await queryClient.fetchQuery<ListResponse | string>({
      queryKey: ['favorites', sessionId],
      queryFn: () => favoritesApi.get(sessionId),
    });
    if (typeof initialData === 'object' && initialData.items) {
      initialItems = initialData.items as unknown as ListProductType[];
    }
  }

  // 3. Передаем и товары, и sessionId в клиентский компонент
  return <FavoritesView initialItems={initialItems} sessionId={sessionId} />;
}
