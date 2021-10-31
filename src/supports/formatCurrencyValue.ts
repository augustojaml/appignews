export const formatCurrencyValue = (value: number, NumberFormat = 'en-US', currency = 'USD') => {
  return new Intl.NumberFormat(NumberFormat, {
    style: 'currency',
    currency: currency,
  }).format(value / 100);
};
