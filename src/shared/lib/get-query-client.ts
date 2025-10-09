import { cache } from 'react';

import { QueryClient } from '@tanstack/react-query';

const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 минут
        },
      },
    }),
);
export default getQueryClient;
