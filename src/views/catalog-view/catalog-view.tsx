'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

import { catalogApi } from '@/shared/api/catalog.api';
import { Heading } from '@/shared/ui';
import { CatalogSections, ProductListWidget } from '@/widgets';

export const CatalogView = () => {
  const pathname = usePathname();

  const { data: catalogData, error } = useQuery({
    queryKey: ['catalog', pathname],
    queryFn: () => catalogApi.get(pathname),
    enabled: !!pathname,
  });

  if (error) return <div>Error loading catalog data {error.message}</div>;

  const { items, section, map, sections } = catalogData || {};

  return (
    <>
      <section>
        <div className="container">
          <Heading as="h1" size="1">
            {section?.title}
          </Heading>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
            incidunt dolorum aut, tempora reiciendis voluptas veniam nihil sunt
            quae. Ipsam sapiente ipsa qui dolorum animi recusandae deleniti
            cupiditate accusamus sint?
          </p>
        </div>
      </section>

      <CatalogSections sections={sections || []} />

      <ProductListWidget items={items || []} map={map || []} />
    </>
  );
};
