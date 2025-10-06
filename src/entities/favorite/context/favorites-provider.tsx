'use client';

import { ReactNode, createContext, useContext } from 'react';

import { ProductType } from '@/entities/product/model/product.type';

import { useFavorites } from '../model/useFavorites';

type FavoritesContextType = {
  favorites: ProductType[];
  isFavorite: (productId: number | string) => boolean;
  queryKey: (string | undefined)[];
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { favorites, isFavorite, queryKey } = useFavorites();

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, queryKey }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error(
      'useFavoritesContext must be used within a FavoritesProvider',
    );
  }
  return context;
};
