'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import { favoritesApi, ListResponse } from '@/shared/api/list.api';
import { useSession } from '@/shared/lib/session.context';

type UseProductListMutationProps = {
  queryKey: string;
  api: typeof favoritesApi;
};

type MutationVariables = {
  product: ProductType;
};

export const useProductListMutation = ({
  queryKey,
  api,
}: UseProductListMutationProps) => {
  const queryClient = useQueryClient();
  const sessionId = useSession();

  const mutation = useMutation<unknown, Error, MutationVariables>({
    mutationFn: ({ product }) => {
      const data = queryClient.getQueryData<ListResponse>([
        queryKey,
        sessionId,
      ]);
      const isInList =
        data?.items.some((item) => item.item_id === product.item_id) ?? false;

      const apiAction = isInList ? api.remove : api.add;
      return apiAction({ item_id: product.item_id }, sessionId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, sessionId] });
    },
  });

  return {
    toggle: (vars: MutationVariables) => mutation.mutate(vars),
    isLoading: mutation.isPending,
  };
};
