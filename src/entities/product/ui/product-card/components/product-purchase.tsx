import React, { useState } from 'react';

import Link from 'next/link';

import { Button, Flex, QuantityCounter } from '@/shared/ui';

import styles from './../product-card.module.scss';

export const ProductPurchase = () => {
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    setIsAddedToCart(true);
  };

  return (
    <Flex direction="column" gap="sm" className={styles.purchase}>
      <Flex gap="sm" className={styles.purchase_wrapper}>
        {isAddedToCart ? (
          <Button variant="primary" asChild className={styles.add_button}>
            <Link href="/cart">В корзине {quantity} шт.</Link>
          </Button>
        ) : (
          <>
            <div className={styles.quantity_control}>
              <QuantityCounter
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <Button
              variant="primary"
              className={styles.add_button}
              onClick={handleAddToCart}
            >
              В корзину
            </Button>
          </>
        )}
      </Flex>
      <Button variant="outline" className={styles.buy_button}>
        Купить в один клик
      </Button>
    </Flex>
  );
};
