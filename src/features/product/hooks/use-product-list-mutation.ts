'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import { favoritesApi, ListResponse } from '@/shared/api/list.api';
import { getSessionId } from '@/shared/api/session.api';
import { ListProductType } from '@/shared/types/list.product.type';

type UseProductListMutationProps = {
  product: ProductType;
  isInList: boolean; // Теперь обязательный проп
  queryKey: 'favorites' | 'compare' | 'cart';
  api: typeof favoritesApi; // Позволяет передавать нужный API
};

export const useProductListMutation = ({
  product,
  isInList,
  queryKey,
  api,
}: UseProductListMutationProps) => {
  const queryClient = useQueryClient();
  const sessionId = getSessionId();

  const mutation = useMutation({
    mutationFn: () => {
      const apiAction = isInList ? api.remove : api.add;
      return apiAction({ item_id: product.item_id });
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [queryKey, sessionId] });

      const previousData = queryClient.getQueryData<ListResponse>([
        queryKey,
        sessionId,
      ]);

      queryClient.setQueryData<ListResponse>(
        [queryKey, sessionId],
        (oldData) => {
          const newItem: ListProductType = {
            id: `temp-${product.item_id}`,
            item_id: product.item_id,
            price: product.price || '0',
            title: product.title,
            url: product.url,
            rec_type: queryKey === 'favorites' ? 'fav' : 'compare',
            ts: String(Date.now() / 1000),
            quantity: '1',
            total: Number(product.price || '0'),
            data: product,
          };

          if (!oldData) {
            return { items: [newItem], total_cost: 0, total_quantity: 0 };
          }

          if (isInList) {
            return {
              ...oldData,
              items: oldData.items.filter(
                (item) => item.item_id !== product.item_id,
              ),
            };
          } else {
            return {
              ...oldData,
              items: [...oldData.items, newItem],
            };
          }
        },
      );

      return { previousData };
    },

    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([queryKey, sessionId], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, sessionId] });
    },
  });

  return {
    toggle: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
