import Image from 'next/image';
import Link from 'next/link';

import { NEXT_PUBLIC_IMAGE_URL } from '@/shared/config/site.config';

import { CatalogSection } from '../../model/catalog.type';

import styles from './section-item.module.scss';

type SectionItemProps = {
  section: CatalogSection;
};

export const SectionItem = ({ section }: SectionItemProps) => {
  const imageUrl =
    section.imgs && section.imgs[0]
      ? NEXT_PUBLIC_IMAGE_URL + section.imgs[0]
      : '/image-placeholder.png';

  return (
    <Link href={section.url} className={styles.root}>
      <div className={styles.image}>
        <Image src={imageUrl} alt={section.title} width={80} height={80} />
      </div>
      <span className={styles.title}>{section.title}</span>
    </Link>
  );
};
