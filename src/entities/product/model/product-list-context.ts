'use client';

import { createContext, useContext } from 'react';

// Определяем форму данных, которые будет хранить наш контекст
type ProductListContextType = {
  favoriteIds: Set<string>;
  compareIds: Set<string>;
  cartIds: Set<string>;
};

// Создаем контекст с пустыми значениями по умолчанию
export const ProductListContext = createContext<ProductListContextType>({
  favoriteIds: new Set(),
  compareIds: new Set(),
  cartIds: new Set(),
});

// Создаем кастомный хук для удобного доступа к контексту
export const useProductListContext = () => {
  const context = useContext(ProductListContext);
  if (!context) {
    throw new Error(
      'useProductListContext must be used within a ProductListContext.Provider',
    );
  }
  return context;
};
