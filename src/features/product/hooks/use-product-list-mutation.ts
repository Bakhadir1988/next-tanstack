'use client';

import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import { favoritesApi, ListResponse } from '@/shared/api/list.api';
import { useSession } from '@/shared/lib/session.context';

type UseProductListMutationProps = {
  queryKey: string;
  api: typeof favoritesApi;
  onSuccessAction?: (isAdded: boolean) => void;
};

type MutationVariables = {
  product: ProductType;
};

export const useProductListMutation = ({
  queryKey,
  api,
  onSuccessAction,
}: UseProductListMutationProps) => {
  const queryClient = useQueryClient();
  const sessionId = useSession();
  const wasInListRef = useRef<boolean>(false);

  const mutation = useMutation<
    boolean,
    Error,
    MutationVariables,
    { previousData?: ListResponse }
  >({
    onMutate: async ({ product }) => {
      // СНАЧАЛА сохраняем оригинальное состояние
      const previousData = queryClient.getQueryData<ListResponse>([
        queryKey,
        sessionId,
      ]);

      // Определяем, был ли товар в списке ДО любых изменений
      wasInListRef.current = previousData
        ? previousData.items.some((item) => item.item_id === product.item_id)
        : false;

      // Отменяем текущие запросы для избежания конфликтов
      await queryClient.cancelQueries({ queryKey: [queryKey, sessionId] });

      // Оптимистично обновляем UI
      if (previousData) {
        if (wasInListRef.current) {
          // Удаляем из списка
          const removedItem = previousData.items.find(
            (item) => item.item_id === product.item_id,
          );
          const newItems = previousData.items.filter(
            (item) => item.item_id !== product.item_id,
          );
          queryClient.setQueryData<ListResponse>([queryKey, sessionId], {
            ...previousData,
            items: newItems,
            total_cost:
              (previousData.total_cost || 0) -
              (removedItem?.total || parseFloat(product.price || '0')),
          });
        } else {
          // Добавляем в список - создаем ListProductType из ProductType
          const newListItem = {
            id: product.item_id,
            item_id: product.item_id,
            price: product.price || '0',
            title: product.title,
            url: product.url,
            rec_type: 'product',
            ts: new Date().toISOString(),
            quantity: '1',
            total: parseFloat(product.price || '0'),
            data: product,
          };
          const newItems = [...previousData.items, newListItem];
          queryClient.setQueryData<ListResponse>([queryKey, sessionId], {
            ...previousData,
            items: newItems,
            total_cost:
              (previousData.total_cost || 0) + parseFloat(product.price || '0'),
          });
        }
      }

      // Возвращаем контекст для rollback
      return { previousData };
    },

    mutationFn: async ({ product }) => {
      // Используем сохраненное значение из ref
      const wasInList = wasInListRef.current;

      const apiAction = wasInList ? api.remove : api.add;
      await apiAction({ item_id: product.item_id }, sessionId);
      return !wasInList;
    },

    onError: (_err, _variables, context) => {
      // Откатываем изменения при ошибке
      if (context?.previousData) {
        queryClient.setQueryData([queryKey, sessionId], context.previousData);
      }
    },

    onSuccess: (isAdded) => {
      queryClient.invalidateQueries({ queryKey: [queryKey, sessionId] });
      onSuccessAction?.(isAdded);
    },
  });

  return {
    toggle: (vars: MutationVariables) => mutation.mutate(vars),
    isLoading: mutation.isPending,
  };
};
