import { FaqType } from '@/shared/types/faq.type';

export type ProductPath = {
  item_id: string;
  url: string;
  title: string;
};

export type ProductDensity = {
  subitem_id: string;
  main: string;
  variant_title: string;
  title: string;
  imgs: string[];
  price: string;
  rating: string;
};

export type ProductType = {
  chars: Record<string, string | string[]>;
  density?: ProductDensity[];
  sections_objects: {
    faq: Record<string, FaqType>;
    related: unknown[];
  };
  item_id: string;
  __path: ProductPath[];
  type_id: string | null;
  title: string;
  short_title: string;
  modify_ts: string;
  create_ts: string;
  articul: string | null;
  in_stock: string;
  novelty: string;
  recommend: string;
  hit: string;
  rating: string | null;
  price: string | null;
  discount: string | null;
  imgs: string[];
  content: string | null;
  enable: string | null;
  url: string;
  manual_url: string;
  exists_in_lists: string[];
};
