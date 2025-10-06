import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';
import { ProductType } from '@/entities/product/model/product.type';

export type TransformedProductProperty = {
  title: string;
  value: string | string[];
  unit: string;
};

export const transformProductProperties = (
  product: ProductType,
  map?: CatalogMap,
): TransformedProductProperty[] => {
  if (!map) {
    return [];
  }
  const transformedChars: TransformedProductProperty[] = [];
  const charsMap = map.find((item) => item.type_name === 'Каталог')?.groups
    .chars.props;

  if (!charsMap || Array.isArray(charsMap)) {
    return [];
  }

  for (const key in product.chars) {
    if (Object.prototype.hasOwnProperty.call(product.chars, key)) {
      const charMap = charsMap[key];
      if (charMap) {
        transformedChars.push({
          title: charMap.title,
          value: product.chars[key],
          unit: charMap.unit,
        });
      }
    }
  }

  return transformedChars;
};
