import { HeartIcon, LayersIcon, TrashIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { ProductType } from '@/entities/product/model/product.type';
import { useProductListMutation } from '@/features/product/hooks/use-product-list-mutation';
import { cartApi, compareApi, favoritesApi } from '@/shared/api/list.api';
import { NEXT_PUBLIC_IMAGE_URL } from '@/shared/config/site.config';
import {
  Badge,
  Button,
  Flex,
  QuantityCounter,
  Rating,
  useToast,
} from '@/shared/ui';

import { useProductListContext } from '../../model/product-list-context';

import styles from './cart-product-row.module.scss';

type CartProductRowProps = {
  product: ProductType; // Assuming a product type similar to other components
};

export const CartProductRow = ({ product }: CartProductRowProps) => {
  const { rating } = product;

  console.log('product', product);

  const { addToast } = useToast();

  const { favoriteIds, compareIds } = useProductListContext();

  const isFavorite = favoriteIds.has(product.item_id);
  const isCompare = compareIds.has(product.item_id);

  const { toggle: toggleFavorite, isLoading: isFavoriteLoading } =
    useProductListMutation({
      queryKey: 'favorites',
      api: favoritesApi,
      onSuccessAction: (isAdded) => {
        addToast({
          image: product.imgs,
          description: product.title,
          href: isAdded ? `/favorites/` : undefined,
          title: isAdded ? 'Добавлено в избранное' : 'Удалено из избранного',
        });
      },
    });

  // 4. Используем универсальный хук для СРАВНЕНИЯ
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

  const { toggle: toggleCart, isLoading: isCartLoading } =
    useProductListMutation({
      queryKey: 'cart',
      api: cartApi,
      onSuccessAction: (isAdded) => {
        addToast({
          image: product.imgs,
          description: product.title,
          title: isAdded ? 'Добавлено в корзину' : 'Удалено из корзины',
        });
      },
    });

  const price = product.price ? parseFloat(product.price) : 0;
  const quantity = 1; // This should come from cart state
  const totalPrice = price * quantity;
  const imageUrl =
    product.imgs && product.imgs[0]
      ? NEXT_PUBLIC_IMAGE_URL + product.imgs[0]
      : '/image-placeholder.png';

  return (
    <div className={styles.root}>
      <div className={styles.image_wrapper}>
        <Image
          src={imageUrl}
          alt={product.title}
          width={100}
          height={100}
          className={styles.image}
        />
      </div>

      {/* Info */}
      <div className={styles.info}>
        <Flex wrap="wrap" className={styles.badges}>
          {product.novelty === '1' && (
            <Badge color="green" size="1" variant="solid">
              Новинка
            </Badge>
          )}
          {product.hit === '1' && (
            <Badge color="red" size="1" variant="solid">
              Хит
            </Badge>
          )}
          {product.recommend === '1' && (
            <Badge color="purple" size="1" variant="solid">
              Советуем
            </Badge>
          )}
          {product.discount && (
            <Badge color="purple" size="1" variant="solid">
              Скидка {product.discount}%
            </Badge>
          )}
        </Flex>
        <Link href={product.url} className={styles.link}>
          {product.title}
        </Link>
        <Rating rating={rating} />
      </div>

      {/* Quantity Counter */}
      <div className={styles.quantity_counter_container}>
        <QuantityCounter
          className={styles.quantity_counter}
          value={product.quantity}
        />
        <div className={styles.price_per_item}>
          {price.toLocaleString('ru-RU')} ₽/шт
        </div>
      </div>

      {/* Total Price */}
      <div className={styles.total_price}>
        {totalPrice.toLocaleString('ru-RU')} ₽
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button
          variant="icon"
          icon={<HeartIcon />}
          onClick={() => toggleFavorite({ product })}
          className={clsx(
            styles.action_button,
            isFavorite && styles.action_button_active,
          )}
          title={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
          disabled={isFavoriteLoading}
          aria-label={
            isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'
          }
        />
        <Button
          variant="icon"
          icon={<LayersIcon />}
          onClick={() => toggleCompare({ product })}
          className={clsx(
            styles.action_button,
            isCompare && styles.action_button_active,
          )}
          title={isCompare ? 'Убрать из сравнения' : 'Добавить в сравнение'}
          disabled={isCompareLoading}
          aria-label={
            isCompare ? 'Убрать из сравнения' : 'Добавить в сравнение'
          }
        />
        <Button
          variant="icon"
          icon={<TrashIcon />}
          aria-label="Удалить из корзины"
          onClick={() => toggleCart({ product })}
          disabled={isCartLoading}
        />
      </div>
    </div>
  );
};
