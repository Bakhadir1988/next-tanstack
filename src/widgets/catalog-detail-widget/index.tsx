'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { catalogApi } from '@/shared/api/catalog.api';

export const CatalogDetailWidget = () => {
  const params = usePathname();

  const { data: detail } = useQuery({
    queryKey: ['catalog', params],
    queryFn: () => catalogApi.get(params),
    enabled: !!params,
  });

  return (
    <div>
      {detail && (
        <div>
          <h2>1111</h2>
        </div>
      )}
    </div>
  );
};
