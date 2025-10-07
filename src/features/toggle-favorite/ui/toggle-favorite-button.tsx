// 'use client';

// import { HeartIcon } from '@radix-ui/react-icons';
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import { useFavoritesContext } from '@/entities/favorite/context/favorites-provider';
// import { favoritesApi } from '@/shared/api/list.api';
// import { Button } from '@/shared/ui';

// type ToggleFavoriteButtonProps = {
//   item_id: string;
// };

// export const ToggleFavoriteButton = ({
//   item_id,
// }: ToggleFavoriteButtonProps) => {
//   const queryClient = useQueryClient();
//   const { isFavorite, queryKey } = useFavoritesContext();

//   const isCurrentlyFavorite = isFavorite(item_id);

//   const { mutate } = useMutation({
//     mutationFn: () =>
//       isCurrentlyFavorite
//         ? favoritesApi.remove({ item_id: item_id })
//         : favoritesApi.add(item_id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey });
//     },
//   });

//   console.log(isCurrentlyFavorite);

//   return (
//     <Button
//       variant="icon"
//       icon={<HeartIcon fill={isCurrentlyFavorite ? 'currentColor' : 'none'} />}
//       style={isCurrentlyFavorite ? { transform: 'translateX(0)' } : undefined}
//       onClick={() => mutate()}
//     />
//   );
// };
