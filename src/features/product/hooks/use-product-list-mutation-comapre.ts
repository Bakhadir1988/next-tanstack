'use client';

import { useMemo } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import { useCompareQuery } from '@/features/compare/hooks/useCompare';
import { compareApi, ListResponse } from '@/shared/api/list.api';
import { ListProductType } from '@/shared/types/list.product.type';

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
export const useProductListMutationCompare = ({
  product,
  queryKey,
}: UseProductListMutationProps) => {
  const queryClient = useQueryClient();

  // Используем правильный хук в зависимости от queryKey
  const { items, sessionId } = useCompareQuery({});

  // Проверяем, находится ли текущий продукт в списке.
  const isInList = useMemo(
    () => items.some((item) => item.item_id === product.item_id),
    [items, product.item_id],
  );

  const mutation = useMutation({
    mutationFn: () => {
      // В зависимости от состояния, выбираем нужный метод API для вызова.
      const apiAction = isInList ? compareApi.remove : compareApi.add;
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
            data: product, // Вкладываем полный объект продукта
          };

          if (!oldData) {
            return {
              items: [newItem],
              total_cost: 0,
              total_quantity: 0,
            };
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
            // Oптимистично добавляем товар
            return {
              ...oldData,
              items: [...oldData.items, newItem],
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
