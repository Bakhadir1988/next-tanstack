import { useQuery } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import {
  cartApi,
  compareApi,
  favoritesApi,
  ListResponse,
} from '@/shared/api/list.api';
import { useSession } from '@/shared/lib/session.context';

// 1. Тип для пропсов хука. queryKey - обязательный.
type UseProductListQueryProps = {
  queryKey: 'compare' | 'favorites' | 'cart';
};

export const useProductListQuery = ({ queryKey }: UseProductListQueryProps) => {
  const sessionId = useSession();

  const { data, isLoading, isError, error } = useQuery<ListResponse>({
    queryKey: [queryKey, sessionId],

    queryFn: () => {
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
          throw new Error(`Invalid queryKey: ${queryKey}`);
      }
      return api.get(sessionId);
    },
    enabled: !!sessionId,
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
