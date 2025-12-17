export interface IExchangeRateService {
  calculateVES(amountUSD: number, rate: number): string;
  calculateProfit(amountUSD: number, percentage: number): number;
}

class ExchangeRateServiceImpl implements IExchangeRateService {
  calculateVES(amountUSD: number, rate: number): string {
    return (amountUSD * rate).toFixed(2);
  }

  calculateProfit(amountUSD: number, percentage: number): number {
    return amountUSD * (percentage / 100);
  }
}

export const exchangeRateService = new ExchangeRateServiceImpl();
