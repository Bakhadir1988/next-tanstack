import { ProductType } from '@/entities/product/model/product.type';
import { MetaType } from '@/shared/types/meta.type';

import { CatalogMap } from './catalog-map.type';

export type CatalogSection = {
  item_id: string;
  title: string;
  url: string;
};

export type CatalogApiResponse = {
  meta: MetaType;
  items: ProductType[];
  map: CatalogMap;
  section: CatalogSection;
  sections: CatalogSection[];
};
