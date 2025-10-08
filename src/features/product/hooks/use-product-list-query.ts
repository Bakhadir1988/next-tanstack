import { useQuery } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import {
  cartApi,
  compareApi,
  favoritesApi,
  ListResponse,
} from '@/shared/api/list.api';
import { getSessionId } from '@/shared/api/session.api';
import { ListProductType } from '@/shared/types/list.product.type';

// 1. Тип для пропсов хука. queryKey - обязательный.
type UseProductListQueryProps = {
  initialItems?: ListProductType[];
  sessionId?: string;
  queryKey: 'compare' | 'favorites' | 'cart';
};

export const useProductListQuery = ({
  initialItems,
  sessionId: sessionIdFromProps,
  queryKey,
}: UseProductListQueryProps) => {
  const localSessionId = getSessionId();
  const sessionId = sessionIdFromProps ?? localSessionId;

  const { data, isLoading, isError, error } = useQuery<ListResponse>({
    // Ключ запроса теперь всегда содержит определенные значения
    queryKey: [queryKey, sessionId],

    queryFn: async (): Promise<ListResponse> => {
      if (!sessionId) {
        return { items: [], total_cost: 0, total_quantity: 0 };
      }

      // 2. Надежная логика выбора API через switch
      let api;
      switch (queryKey) {
        case 'favorites':
          api = favoritesApi;
          break;
        case 'compare':
          api = compareApi;
          break;
        case 'cart':
          api = cartApi;
          break;

        default:
          // Обработка случая, когда queryKey имеет неожиданное значение
          console.error(`Invalid queryKey: ${queryKey}`);
          return { items: [], total_cost: 0, total_quantity: 0 };
      }

      const result = await api.get(sessionId);

      if (typeof result === 'string') {
        console.error(`${queryKey} API returned a string:`, result);
        return { items: [], total_cost: 0, total_quantity: 0 };
      }

      return result;
    },
    // 3. Запрос активен только если есть sessionId
    enabled: !!sessionId,
    initialData: initialItems
      ? { items: initialItems, total_cost: 0, total_quantity: 0 }
      : undefined,
  });

  const items: ProductType[] = (data?.items ?? []).map((item) => ({
    ...item.data,
    url: item.url,
  }));

  return {
    items,
    isLoading,
    isError,
    error,
    sessionId,
  };
};
