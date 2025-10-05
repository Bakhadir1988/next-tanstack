import { CatalogApiResponse } from '@/entities/catalog/model/catalog.type';

import { API_BASE_URL } from '../config/site.config';

const fetchBySlug = async (
  slug: string,
): Promise<CatalogApiResponse | null> => {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL не определен');
  }

  try {
    const res = await fetch(`${API_BASE_URL}${slug}`);

    if (!res.ok) {
      if (res.status === 404) {
        return null; // Возвращаем null, если страница не найдена
      }
      throw new Error(`Error fetching from catalog server: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    throw new Error(`Error fetching catalog data: ${error}`);
  }
};

const fetchCatalogPost = async (
  form: FormData,
): Promise<CatalogApiResponse> => {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL не определен');
  }

  try {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      body: form,
    });

    if (!res.ok) {
      throw new Error(`Error fetching from catalog server: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    throw new Error(`Error fetching catalog data: ${error}`);
  }
};

const catalogApiList = () => {
  return {
    get: (slug: string) => fetchBySlug(slug),
    post: (form: FormData) => fetchCatalogPost(form),
  };
};

export const catalogApi = catalogApiList();
