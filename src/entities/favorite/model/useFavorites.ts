import { useQuery } from '@tanstack/react-query';

import { favoritesApi, ListResponse } from '@/shared/api/list.api';
import { getSessionId } from '@/shared/api/session.api';

export const useFavorites = () => {
  const sessionId = getSessionId();

  const queryKey = ['favorites', sessionId];

  const { data: favorites, ...rest } = useQuery<ListResponse>({
    queryKey,
    queryFn: async () => {
      const result = await favoritesApi.get(sessionId);
      if (typeof result === 'string') {
        throw new Error('API returned a string instead of JSON');
      }
      return result;
    },
    enabled: !!sessionId,
    initialData: { items: [] }, // Начальные данные во избежание ошибок
  });

  const isFavorite = (productId: number | string) => {
    return favorites.items.some((item) => item.item_id === productId);
  };

  return {
    favorites: favorites.items,
    isFavorite,
    queryKey,
    ...rest,
  };
};
