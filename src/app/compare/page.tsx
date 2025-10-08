// src/app/favorites/page.tsx

import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers'; // <--- Импортируем cookies

import { compareApi, ListResponse } from '@/shared/api/list.api';
import { ListProductType } from '@/shared/types/list.product.type';
import { CompareView } from '@/views';

export default async function ComparePage() {
  const queryClient = new QueryClient();

  // 1. Правильно получаем sessionId из cookies на сервере
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;

  let initialItems: ListProductType[] = [];

  // 2. Запрашиваем данные, только если sessionId существует
  if (sessionId) {
    const initialData = await queryClient.fetchQuery<ListResponse | string>({
      queryKey: ['compare', sessionId],
      queryFn: () => compareApi.get(sessionId),
    });
    if (typeof initialData === 'object' && initialData.items) {
      initialItems = initialData.items as unknown as ListProductType[];
    }
  }

  // 3. Передаем и товары, и sessionId в клиентский компонент
  return <CompareView initialItems={initialItems} sessionId={sessionId} />;
}
