'use client';

import { useQuery } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import { favoritesApi, ListResponse } from '@/shared/api/list.api';
import { getSessionId } from '@/shared/api/session.api';
import { ListProductType } from '@/shared/types/list.product.type';

type UseFavoritesQueryProps = {
  initialItems?: ListProductType[];
  sessionId?: string;
};

export const useFavoritesQuery = ({
  initialItems,
  sessionId: sessionIdFromProps,
}: UseFavoritesQueryProps = {}) => {
  const localSessionId = getSessionId();
  const sessionId = sessionIdFromProps ?? localSessionId;

  const { data, isLoading, isError, error } = useQuery<ListResponse>({
    queryKey: ['favorites', sessionId],

    queryFn: async (): Promise<ListResponse> => {
      if (!sessionId) {
        return { items: [], total_cost: 0, total_quantity: 0 };
      }

      const result = await favoritesApi.get(sessionId);

      if (typeof result === 'string') {
        console.error('Favorites API returned a string:', result);
        return { items: [], total_cost: 0, total_quantity: 0 };
      }

      return result;
    },
    enabled: !!sessionId,
    initialData: initialItems
      ? { items: initialItems, total_cost: 0, total_quantity: 0 }
      : undefined,
  });

  const items: ProductType[] = (data?.items ?? []).map((item) => ({
    ...item.data,
    url: item.url,
  }));

  return { items, isLoading, isError, error, sessionId };
};
