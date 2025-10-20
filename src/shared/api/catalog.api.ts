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

import { SectionApiResponse } from '@/entities/catalog/model/section.type';

const fetchSectionById = async (
  sect_id: string,
): Promise<SectionApiResponse | null> => {
  const sectionApiUrl = 'https://litra-adm.workup.spb.ru/api/';
  try {
    const res = await fetch(
      `${sectionApiUrl}?comp=catsections&sect_id=${sect_id}`,
    );

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Error fetching from section server: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    throw new Error(`Error fetching section data: ${error}`);
  }
};

const catalogApiList = () => {
  return {
    get: (slug: string) => fetchBySlug(slug),
    post: (form: FormData) => fetchCatalogPost(form),
    getSection: (sect_id: string) => fetchSectionById(sect_id),
  };
};

export const catalogApi = catalogApiList();
