export type MetaType = {
  short_title: string;
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  robots: string | null;
  h1: string;
  json_ld_breadcrumbs: {
    '@context': string;
    '@type': string;
    itemListElement: {
      '@type': string;
      position: number;
      item: {
        '@id': string;
        name: string;
      };
    }[];
  };
};
