// 'use client';

// import { MixerHorizontalIcon } from '@radix-ui/react-icons';

// import { CartSummary } from '@/entities/product/ui/cart-summary/cart-summary';
// import { useProductListQuery } from '@/features/product/hooks/use-product-list-query';
// import { ListProductType } from '@/shared/types/list.product.type';
// import { Grid, Heading } from '@/shared/ui';
// import { EmptyState } from '@/shared/ui/empty-state';

// import styles from './cart-view.module.scss';

// type CartViewProps = {
//   initialItems: ListProductType[];
//   sessionId: string | undefined;
// };

// export const CartView = ({ initialItems, sessionId }: CartViewProps) => {
//   const { items } = useProductListQuery({
//     initialItems,
//     sessionId,
//     queryKey: 'cart',
//   });

//   return (
//     <>
//       <Heading as="h1">Корзина</Heading>
//       {!items.length ? (
//         <EmptyState
//           icon={<MixerHorizontalIcon width={50} height={50} />}
//           title="Нет товаров в корзине"
//           description="Добавьте товары в корзину, чтобы отслеживать их цену и наличие."
//         />
//       ) : (
//         <Grid columns="1fr 300px" gap="md" className={styles.root}>
//           <div>
//             {items.map((product) => (
//               <CartProductRow key={product.item_id} product={product} />
//             ))}
//           </div>
//           <CartSummary />
//         </Grid>
//       )}
//     </>
//   );
// };
