export const calculateVES = (amountUSD: number, rate: number): string => {
  return (amountUSD * rate).toFixed(2);
};

export const calculateProfit = (
  amountUSD: number,
  percentage: number,
): number => {
  return amountUSD * (percentage / 100);
};
