'use client';

import { useQuery } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import { favoritesApi, ListResponse } from '@/shared/api/list.api';
import { getSessionId } from '@/shared/api/session.api';

type UseFavoritesQueryProps = {
  initialItems?: ProductType[];
  sessionId?: string;
};

export const useFavoritesQuery = ({
  initialItems,
  sessionId: sessionIdFromProps,
}: UseFavoritesQueryProps = {}) => {
  const localSessionId = getSessionId();
  const sessionId = sessionIdFromProps ?? localSessionId;

  // Указываем <ListResponse> явно, чтобы помочь TypeScript
  const { data, isLoading, isError, error } = useQuery<ListResponse>({
    queryKey: ['favorites', sessionId],

    // 1. Делаем функцию асинхронной, чтобы обработать результат
    queryFn: async (): Promise<ListResponse> => {
      if (!sessionId) {
        return { items: [], total_cost: 0, total_quantity: 0 };
      }

      const result = await favoritesApi.get(sessionId);

      // 2. Если API вернуло строку, преобразуем ее в стандартный ответ
      if (typeof result === 'string') {
        console.error('Favorites API returned a string:', result);
        return { items: [], total_cost: 0, total_quantity: 0 };
      }

      // 3. Если все хорошо, возвращаем результат
      return result;
    },
    enabled: !!sessionId,
    initialData: initialItems
      ? { items: initialItems, total_cost: 0, total_quantity: 0 }
      : undefined,
  });

  // Теперь мы можем быть уверены, что data.items всегда будет массивом
  const items = data?.items ?? [];

  return { items, isLoading, isError, error, sessionId };
};
