'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { ProductList } from '@/entities/product/ui/product-list';
import { catalogApi } from '@/shared/api/catalog.api';
import { Heading } from '@/shared/ui';
import { SegmentControlValue } from '@/shared/ui/segment-control';
import { CatalogSections, ProductListToolbar } from '@/widgets';

export const CatalogView = () => {
  const pathname = usePathname();
  const [view, setView] = useState<SegmentControlValue>('block');

  const { data: catalogData, error } = useQuery({
    queryKey: ['catalog', pathname],
    queryFn: () => catalogApi.get(pathname),
    enabled: !!pathname,
  });

  if (error) return <div>Error loading catalog data {error.message}</div>;

  const { items, section, map, sections } = catalogData || {};

  return (
    <div>
      <Heading as="h1" size="1">
        {section?.title}
      </Heading>
      <CatalogSections sections={sections} />
      <ProductListToolbar view={view} onViewChangeAction={setView} />
      <ProductList items={items || []} map={map || []} view={view} />
    </div>
  );
};
