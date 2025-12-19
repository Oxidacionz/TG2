/**
 * Utilidades para manejo de monedas y cálculos financieros.
 * Desacoplado de cualquier servicio de tasas.
 */

/**
 * Calcula el valor equivalente en Bolívares (VES) dado un monto en USD y una tasa.
 * @param amountUSD Monto en dólares.
 * @param rate Tasa de cambio.
 * @returns String con el valor formateado a 2 decimales.
 */
export const calculateVES = (amountUSD: number, rate: number): string => {
  return (amountUSD * rate).toFixed(2);
};

/**
 * Calcula la ganancia (profit) basada en un porcentaje del monto.
 * @param amountUSD Monto base en dólares.
 * @param percentage Porcentaje de ganancia deseado.
 * @returns Valor numérico de la ganancia.
 */
export const calculateProfit = (
  amountUSD: number,
  percentage: number,
): number => {
  return amountUSD * (percentage / 100);
};
