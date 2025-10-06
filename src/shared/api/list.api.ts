import { ProductType } from '@/entities/product/model/product.type';

import { API_BASE_URL } from '../config/site.config';

import { getSessionId } from './session.api';

export type ListResponse = {
  items: ProductType[];
  total_cost?: number;
  total_quantity?: number;
};

type ListType = 'fav' | 'compare';

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
    get: (sessionId: string): Promise<ListResponse | string> => {
      const form = new FormData();
      form.append('comp', 'list_server');
      form.append('list', list);
      form.append('session_id', sessionId);
      return fetchFromListServer(form);
    },

    add: (item_id: string): Promise<ListResponse | string> => {
      const form = new FormData();
      const sessionId = getSessionId();
      if (sessionId) {
        form.append('session_id', sessionId);
      }
      form.append('comp', 'list_server');
      form.append('list', list);
      form.append('action', 'add');
      form.append('item_id', item_id);
      form.append('subitem_id', '');
      form.append('quantity', '1');
      return fetchFromListServer(form);
    },

    remove: (item: { item_id: string }): Promise<ListResponse | string> => {
      const form = new FormData();
      const sessionId = getSessionId();
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
  };
};

export const favoritesApi = createListApi('fav');
export const compareApi = createListApi('compare');
