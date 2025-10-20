import { ProductType } from '@/entities/product/model/product.type';

export type ListProductType = {
  id: string;
  item_id: string;
  price: string;
  title: string;
  url: string;
  rec_type: string;
  ts: string;
  quantity: string;
  total: number;
  data: ProductType;
  sect_id?: string | null;
};
