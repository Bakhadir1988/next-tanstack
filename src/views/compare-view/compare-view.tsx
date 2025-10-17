import { CompareGridWidget } from '@/widgets/compare-grid';

import { Heading } from '@/shared/ui';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import styles from './compare-view.module.scss';

// This component will receive props with all comparison data.
// For now, it's a static layout.
export const CompareView = () => {
  // Hardcoded data for layout purposes
  const categories = [
    { name: 'Макияж', count: 3 },
    { name: 'Запчасти для автомобилей', count: 1 },
    { name: 'Смарт-часы', count: 1 },
    { name: 'Посуда', count: 1 },
    { name: 'Женская обувь', count: 1 },
  ];

  return (
    <div className="container">
      <Breadcrumbs />
      <Heading as="h1" size="2" className="page_title">
        Сравнение товаров
      </Heading>

      <Tabs defaultValue={categories[0].name}>
        <TabsList>
          {categories.map((cat) => (
            <TabsTrigger key={cat.name} value={cat.name}>
              {cat.name} <span className="count">{cat.count}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* The content for each tab would go here */}
        {/* For this static layout, we show the same grid in the first tab */}
        <TabsContent value={categories[0].name}>
          <div className={styles.toolbar}>
            <div className={styles.toggle_wrapper}>
              <label htmlFor="diff-toggle">Только отличия</label>
            </div>
            <button className={styles.clear_button}>Очистить сравнение</button>
          </div>
          <CompareGridWidget />
        </TabsContent>
        {/* Other TabsContent would go here... */}
      </Tabs>
    </div>
  );
};
