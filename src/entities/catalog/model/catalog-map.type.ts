export type CatalogMapProperty = {
  prop_id: string;
  title: string;
  type: string;
  tpl_key: string;
  unit: string;
  filter_enabled: string;
  valuefield: string;
};

export type CatalogMapGroup = {
  group_id: string;
  tpl_key: string;
  variant: string;
  props: Record<string, CatalogMapProperty> | CatalogMapProperty[];
};

export type CatalogMapItem = {
  type_id: string;
  type_name: string;
  groups: Record<string, CatalogMapGroup>;
};

export type CatalogMap = CatalogMapItem[];
