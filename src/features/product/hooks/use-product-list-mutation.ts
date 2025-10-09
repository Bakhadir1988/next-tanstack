'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import {
  cartApi,
  compareApi,
  favoritesApi,
  ListResponse,
} from '@/shared/api/list.api';
import { useSession } from '@/shared/lib/session.context';

type UseProductListMutationProps = {
  queryKey: string;
  api: typeof favoritesApi;
  onSuccessAction?: (isAdded: boolean) => void;
};

type MutationVariables = {
  product: ProductType;
};

const getApi = (queryKey: string) => {
  switch (queryKey) {
    case 'favorites':
      return favoritesApi;
    case 'compare':
      return compareApi;
    case 'cart':
      return cartApi;
    default:
      throw new Error(`Invalid queryKey: ${queryKey}`);
  }
};

export const useProductListMutation = ({
  queryKey,
  api,
  onSuccessAction,
}: UseProductListMutationProps) => {
  const queryClient = useQueryClient();
  const sessionId = useSession();

  const mutation = useMutation<boolean, Error, MutationVariables>({
    mutationFn: async ({ product }) => {
      const data = await queryClient.fetchQuery<ListResponse>({
        queryKey: [queryKey, sessionId],
        queryFn: () => getApi(queryKey).get(sessionId),
      });

      const isInList =
        data?.items.some((item) => item.item_id === product.item_id) ?? false;

      const apiAction = isInList ? api.remove : api.add;
      await apiAction({ item_id: product.item_id }, sessionId);
      return !isInList;
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
