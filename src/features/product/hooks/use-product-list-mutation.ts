'use client';

import { useMemo } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useFavoritesQuery } from '@/entities/favorite/model/useFavorites';
import { ProductType } from '@/entities/product/model/product.type';
import { favoritesApi, ListResponse } from '@/shared/api/list.api';

type UseProductListMutationProps = {
  product: ProductType;
  queryKey: 'favorites' | 'compare';
};

/**
 * @description Хук для мутации (добавления/удаления) элемента в списке (избранное, сравнение).
 * Реализует оптимистичное обновление для мгновенного отклика UI.
 * @param product - Полный объект продукта для мутации.
 * @param queryKey - Ключ списка ('favorites' или 'compare'), который нужно мутировать.
 */
export const useProductListMutation = ({
  product,
  queryKey,
}: UseProductListMutationProps) => {
  const queryClient = useQueryClient();

  // Используем основной query-хук как единый источник правды о списке избранного.
  // Это гарантирует, что данные будут загружены, если их нет в кэше.
  const { items, sessionId } = useFavoritesQuery({});

  // Проверяем, находится ли текущий продукт в списке, полученном из useFavoritesQuery.
  const isInList = useMemo(
    () => items.some((item) => item.item_id === product.item_id),
    [items, product.item_id],
  );

  const mutation = useMutation({
    mutationFn: () => {
      // В зависимости от состояния, выбираем нужный метод API для вызова.
      const apiAction = isInList ? favoritesApi.remove : favoritesApi.add;
      return apiAction({ item_id: product.item_id });
    },

    // onMutate срабатывает до вызова mutationFn. Здесь мы реализуем оптимистичное обновление.
    onMutate: async () => {
      // Отменяем все активные запросы по этому ключу, чтобы они не затерли наше оптимистичное обновление.
      await queryClient.cancelQueries({ queryKey: [queryKey, sessionId] });

      // Сохраняем текущие данные из кэша, чтобы можно было к ним откатиться в случае ошибки.
      const previousData = queryClient.getQueryData<ListResponse>([
        queryKey,
        sessionId,
      ]);

      // Оптимистично (мгновенно) обновляем UI, вручную изменяя данные в кэше.
      queryClient.setQueryData<ListResponse>(
        [queryKey, sessionId],
        (oldData) => {
          if (!oldData) {
            return { items: [product], total_cost: 0, total_quantity: 0 };
          }

          if (isInList) {
            // Оптимистично удаляем товар
            return {
              ...oldData,
              items: oldData.items.filter(
                (item) => item.item_id !== product.item_id,
              ),
            };
          } else {
            // Оптимистично добавляем товар
            return {
              ...oldData,
              items: [...oldData.items, product],
            };
          }
        },
      );

      // Возвращаем снимок предыдущих данных в контексте для использования в onError.
      return { previousData };
    },

    // Если мутация завершилась с ошибкой, откатываем кэш к состоянию, которое было до нашего вмешательства.
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([queryKey, sessionId], context.previousData);
      }
    },

    // onSettled вызывается после мутации, независимо от ее исхода (успех или ошибка).
    // Здесь мы инвалидируем кэш, чтобы синхронизировать состояние клиента с актуальным состоянием на сервере.
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, sessionId] });
    },
  });

  return {
    toggle: mutation.mutate,
    isInList,
    isLoading: mutation.isPending,
  };
};
