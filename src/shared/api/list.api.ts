import { ListProductType } from '@/shared/types/list.product.type';

import { API_BASE_URL } from '../config/site.config';
import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';

export type ListResponse = {
  items: ListProductType[];
  map?: CatalogMap;
  total_cost?: number;
  total_quantity?: number;
};

type ListType = 'fav' | 'compare' | 'cart';

async function fetchFromListServer(
  form: FormData,
): Promise<ListResponse | string> {
  const baseUrl = API_BASE_URL + '/';
  if (!baseUrl) {
    console.error('API_BASE_URL не определен');
    return '';
  }

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      body: form,
      cache: 'no-store',
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error('Error fetching from list server');
    }
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return (await response.json()) as ListResponse;
    }
    return await response.text();
  } catch (error) {
    console.error('List API Error:', error);
    throw error;
  }
}

const createListApi = (list: ListType) => {
  return {
    get: async (sessionId: string): Promise<ListResponse> => {
      const form = new FormData();
      if (sessionId) form.append('session_id', sessionId);
      form.append('comp', 'list_server');
      form.append('list', list);
      const result = await fetchFromListServer(form);

      console.log('result', result);

      if (typeof result === 'string') {
        console.warn(
          `API for list "${list}" returned a string for GET: ${result}. Returning empty list.`,
        );
        return { items: [] };
      }
      return result;
    },

    add: (
      item: { item_id: string },
      sessionId: string,
    ): Promise<ListResponse | string> => {
      console.log('item', item);

      const form = new FormData();
      if (sessionId) {
        form.append('session_id', sessionId);
      }
      form.append('comp', 'list_server');
      form.append('list', list);
      form.append('action', 'add');
      form.append('item_id', item.item_id);
      form.append('subitem_id', '');
      form.append('quantity', '1');
      return fetchFromListServer(form);
    },

    remove: (
      item: { item_id: string },
      sessionId: string,
    ): Promise<ListResponse | string> => {
      const form = new FormData();
      if (sessionId) {
        form.append('session_id', sessionId);
      }
      form.append('comp', 'list_server');
      form.append('list', list);
      form.append('action', 'del');
      form.append('item_id', item.item_id);
      form.append('subitem_id', '');
      form.append('quantity', '1');
      return fetchFromListServer(form);
    },

    clear: async (sessionId: string): Promise<ListResponse | string> => {
      const form = new FormData();
      if (sessionId) {
        form.append('session_id', sessionId);
      }
      form.append('comp', 'list_server');
      form.append('list', list);
      form.append('action', 'clear');
      const result = await fetchFromListServer(form);
      console.log(`Clear API result for list '${list}':`, result);
      return result;
    },
  };
};

export const favoritesApi = createListApi('fav');
export const compareApi = createListApi('compare');
export const cartApi = createListApi('cart');
