export const formatPrice = (
  price: number | string | null | undefined,
): string => {
  if (price === null || price === undefined || price === '') {
    return 'Цена по запросу';
  }

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numericPrice)) {
    return 'Цена по запросу';
  }

  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericPrice);
};
