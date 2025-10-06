'use client';

import { HeartIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useFavoritesContext } from '@/entities/favorite/context/favorites-provider';
import { ProductType } from '@/entities/product/model/product.type';
import { favoritesApi } from '@/shared/api/list.api';
import { Button } from '@/shared/ui';

type Props = {
  product: ProductType;
};

export const ToggleFavoriteButton = ({ product }: Props) => {
  const queryClient = useQueryClient();
  const { isFavorite, queryKey } = useFavoritesContext();

  const isCurrentlyFavorite = isFavorite(product.item_id);

  const { mutate } = useMutation({
    mutationFn: () =>
      isCurrentlyFavorite
        ? favoritesApi.remove({ item_id: product.item_id })
        : favoritesApi.add(product.item_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <Button
      variant="icon"
      icon={<HeartIcon fill={isCurrentlyFavorite ? 'currentColor' : 'none'} />}
      onClick={() => mutate()}
    />
  );
};
