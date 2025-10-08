import { HeartIcon, TrashIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

import { ProductType } from '@/entities/product/model/product.type';
import {
  Badge,
  Button,
  Flex,
  Grid,
  Heading,
  QuantityCounter,
} from '@/shared/ui';

import styles from './cart-product-row.module.scss';

type CartProductRowProps = {
  product: ProductType; // Assuming a product type similar to other components
};

export const CartProductRow = ({ product }: CartProductRowProps) => {
  // Assuming badges are part of the product data
  const badges = product.badges || [];
  const price = product.price ? parseFloat(product.price) : 0;
  const quantity = 1; // This should come from cart state
  const totalPrice = price * quantity;

  return (
    // <div className={styles.root}>
    //   {/* Image */}
    //   <div className={styles.image_wrapper}>
    //     {/*<Image
    //       src={product.image || '/image-placeholder.png'}
    //       alt={product.title}
    //       fill
    //       className={styles.image}
    //     />*/}
    //     <div className={styles.badges}>
    //       {badges.map((badge) => (
    //         <Badge key={badge.id} variant={badge.color || 'gray'}>
    //           {badge.name}
    //         </Badge>
    //       ))}
    //     </div>
    //   </div>

    //   {/* Info */}
    //   <div className={styles.info}>
    //     <Heading as="h3" size="3" className={styles.title}>
    //       {product.title}
    //     </Heading>
    //   </div>

    //   {/* Quantity Counter */}
    //   <div>
    //     <QuantityCounter />
    //     <div className={styles.price_per_item}>
    //       {price.toLocaleString('ru-RU')} ₽/шт
    //     </div>
    //   </div>

    //   {/* Total Price */}
    //   <div className={styles.total_price}>
    //     {totalPrice.toLocaleString('ru-RU')} ₽
    //   </div>

    //   {/* Actions */}
    //   <div className={styles.actions}>
    //     <Button
    //       variant="icon"
    //       icon={<HeartIcon />}
    //       aria-label="Добавить в избранное"
    //     />
    //     <Button
    //       variant="icon"
    //       icon={<TrashIcon />}
    //       aria-label="Удалить из корзины"
    //     />
    //   </div>
    // </div>
    //

    <div>1111</div>
  );
};
