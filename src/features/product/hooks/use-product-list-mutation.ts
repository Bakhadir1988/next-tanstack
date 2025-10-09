'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import { favoritesApi, ListResponse } from '@/shared/api/list.api';
import { useSession } from '@/shared/lib/session.context';

type UseProductListMutationProps = {
  queryKey: string;
  api: typeof favoritesApi;
  onSuccess?: (isAdded: boolean) => void;
};

type MutationVariables = {
  product: ProductType;
};

export const useProductListMutation = ({
  queryKey,
  api,
  onSuccess,
}: UseProductListMutationProps) => {
  const queryClient = useQueryClient();
  const sessionId = useSession();

  const mutation = useMutation<boolean, Error, MutationVariables>({
    mutationFn: async ({ product }) => {
      const data = queryClient.getQueryData<ListResponse>([
        queryKey,
        sessionId,
      ]);
      const isInList =
        data?.items.some((item) => item.item_id === product.item_id) ?? false;

      const apiAction = isInList ? api.remove : api.add;
      await apiAction({ item_id: product.item_id }, sessionId);
      return !isInList;
    },

    onSuccess: (isAdded) => {
      queryClient.invalidateQueries({ queryKey: [queryKey, sessionId] });
      onSuccess?.(isAdded);
    },
  });

  return {
    toggle: (vars: MutationVariables) => mutation.mutate(vars),
    isLoading: mutation.isPending,
  };
};
