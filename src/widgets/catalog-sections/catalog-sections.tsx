import clsx from 'clsx';

import { CatalogSection } from '@/entities/catalog/model/catalog.type';
import { SectionItem } from '@/entities/catalog/ui/section-item/section-item';
import { Grid } from '@/shared/ui';

import styles from './catalog-sections.module.scss';

type CatalogSectionProps = {
  sections: CatalogSection[];
};

export const CatalogSections = ({ sections }: CatalogSectionProps) => {
  if (!sections.length) {
    return null;
  }

  return (
    <section className={styles.root}>
      <div className={clsx(styles.container, 'container')}>
        <Grid gap="sm" className={styles.grid}>
          {sections.map((section) => (
            <SectionItem key={section.item_id} section={section} />
          ))}
        </Grid>
      </div>
    </section>
  );
};
