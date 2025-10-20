'use client';

import { CompareGridWidget } from '@/widgets/compare-grid';

import { ProductType } from '@/entities/product/model/product.type';
import { useCompareSections } from '@/features/product/hooks/use-compare-sections';
import { compareApi, ListResponse } from '@/shared/api/list.api';
import { useSession } from '@/shared/lib/session.context';
import { EmptyState, Heading } from '@/shared/ui';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import styles from './compare-view.module.scss';

export const CompareView = () => {
  const sessionId = useSession();

  const { data: items } = useQuery<ListResponse>({
    queryKey: ['compare', sessionId],
    queryFn: () => compareApi.get(sessionId),
    enabled: !!sessionId,
  });

  const initItems: ProductType[] = (items?.items ?? []).map((item) => ({
    ...item.data,
    url: item.url,
    sect_id: item.sect_id,
  }));

  const { sections, isError } = useCompareSections(initItems);

  if (!initItems.length) {
    return (
      <EmptyState
        icon={<MixerHorizontalIcon width={50} height={50} />}
        title="Нет товаров в сравнении"
        description="Добавьте товары в сравнении, чтобы отслеживать их цену и наличие."
      />
    );
  }

  if (isError) {
    return (
      <EmptyState
        icon={<MixerHorizontalIcon width={50} height={50} />}
        title="Ошибка загрузки"
        description="Не удалось загрузить информацию о категориях товаров. Попробуйте позже."
      />
    );
  }

  return (
    <div className="container">
      <Breadcrumbs />
      <Heading as="h1" size="2" className="page_title">
        Сравнение товаров
      </Heading>

      {sections.length > 0 && (
        <Tabs defaultValue={sections[0].id}>
          <TabsList>
            {sections.map((cat) => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.title} <span className="count">{cat.products.length}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {sections.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <div className={styles.toolbar}>
                <div className={styles.toggle_wrapper}>
                  <label htmlFor="diff-toggle">Только отличия</label>
                </div>
                <button className={styles.clear_button}>
                  Очистить сравнение
                </button>
              </div>
              <CompareGridWidget items={cat.products} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};
