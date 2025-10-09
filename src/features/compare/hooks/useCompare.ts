'use client';

import { useQuery } from '@tanstack/react-query';

import { ProductType } from '@/entities/product/model/product.type';
import { compareApi, ListResponse } from '@/shared/api/list.api';
import { useSession } from '@/shared/lib/session.context';

export const useCompareQuery = () => {
  const sessionId = useSession();

  const { data, isLoading, isError, error } = useQuery<ListResponse>({
    queryKey: ['compare', sessionId],
    queryFn: () => compareApi.get(sessionId),
    enabled: !!sessionId,
  });

  const items: ProductType[] = (data?.items ?? []).map((item) => ({
    ...item.data,
    url: item.url,
  }));

  return { items, isLoading, isError, error, sessionId };
};
