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
    <Grid gap="sm" className={styles.root}>
      {sections.map((section) => (
        <SectionItem key={section.item_id} section={section} />
      ))}
    </Grid>
  );
};
