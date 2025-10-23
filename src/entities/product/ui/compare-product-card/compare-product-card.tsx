import { ActionButton, Flex, Rating, StockStatus, useToast } from '@/shared/ui';

import { CatalogMap } from '@/entities/catalog/model/catalog-map.type';
import { useProductListMutation } from '@/features/product/hooks/use-product-list-mutation';
import { ProductPurchase } from '@/features/product/ui';
import { compareApi } from '@/shared/api/list.api';
import { TrashIcon } from '@radix-ui/react-icons';
import { useProductListContext } from '../../model/product-list-context';
import { ProductType } from '../../model/product.type';
import {
  ProductCharacteristics,
  ProductImageSlider,
  ProductPrice,
  ProductTitle,
} from '../components';
import styles from './compare-product-card.module.scss';

type CompareProductCardProps = {
  product: ProductType;
  map?: CatalogMap;
};

export const CompareProductCard = ({
  product,
  map,
}: CompareProductCardProps) => {
  const { addToast } = useToast();

  const { compareIds } = useProductListContext();

  const isCompare = compareIds.has(product.item_id);

  const { toggle: toggleCompare, isLoading: isCompareLoading } =
    useProductListMutation({
      queryKey: 'compare',
      api: compareApi,
      onSuccessAction: (isAdded) => {
        addToast({
          image: product.imgs,
          description: product.title,
          href: isAdded ? `/compare/` : undefined,
          title: isAdded ? 'Добавлено в сравнение' : 'Удалено из сравнения',
        });
      },
    });

  return (
    <Flex direction="column" gap="sm" className={styles.root}>
      <Flex align="center" justify="center" className={styles.top}>
        <ProductImageSlider product={product} width={300} height={300} />
        <ActionButton
          icon={<TrashIcon />}
          onClick={() => toggleCompare({ product })}
          disabled={isCompareLoading}
          className={styles.remove_button}
          isActive={isCompare}
          titleActive="Убрать из сравнения"
          titleInactive="Добавить в сравнения"
        />
      </Flex>
      <ProductTitle product={product} className={styles.title} />
      <ProductPrice product={product} />
      <Flex direction="column" gap="sm" className={styles.info}>
        <Flex align="center" justify="between">
          <Rating rating={product.rating} />
          <StockStatus in_stock={product.in_stock} />
        </Flex>
        <ProductCharacteristics product={product} map={map} />
        <ProductPurchase product={product} />
      </Flex>
    </Flex>
  );
};
