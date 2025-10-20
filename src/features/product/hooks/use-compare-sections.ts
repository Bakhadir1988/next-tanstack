import { useQueries } from '@tanstack/react-query';

import { Section } from '@/entities/catalog/model/section.type';
import { ProductType } from '@/entities/product/model/product.type';
import { catalogApi } from '@/shared/api/catalog.api';

export interface CompareSection {
  id: string;
  title: string;
  products: ProductType[];
}

const OTHERS_CATEGORY_ID = 'others';

export const useCompareSections = (products: ProductType[]) => {
  const sectionIds = [
    ...new Set(products.map((p) => p.sect_id).filter(Boolean)),
  ] as string[];

  const sectionQueries = useQueries({
    queries: sectionIds.map((id) => ({
      queryKey: ['section', id],
      queryFn: () => catalogApi.getSection(id),
      staleTime: Infinity, // Section data is static
    })),
  });

  const isLoading = sectionQueries.some((q) => q.isLoading);
  const isError = sectionQueries.some((q) => q.isError);

  const sectionsData = sectionQueries
    .map((q) => q.data?.section)
    .filter(Boolean) as Section[];

  const productsBySection: Record<string, ProductType[]> = {};
  const productsWithNoSection: ProductType[] = [];

  for (const product of products) {
    if (product.sect_id && sectionIds.includes(product.sect_id)) {
      if (!productsBySection[product.sect_id]) {
        productsBySection[product.sect_id] = [];
      }
      productsBySection[product.sect_id].push(product);
    } else {
      productsWithNoSection.push(product);
    }
  }

  const sections: CompareSection[] = sectionsData.map((section) => ({
    id: section.item_id,
    title: section.title,
    products: productsBySection[section.item_id] || [],
  }));

  if (productsWithNoSection.length > 0) {
    sections.push({
      id: OTHERS_CATEGORY_ID,
      title: 'Без категории',
      products: productsWithNoSection,
    });
  }

  // Sort sections to have consistent order
  sections.sort((a, b) => a.title.localeCompare(b.title));

  return {
    sections,
    isLoading,
    isError,
  };
};
