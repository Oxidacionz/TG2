export interface ExchangeRateData {
  from: string;
  to: string;
  rate: number;
  source: string;
  timestamp: string;
}

export type ExchangeRate = ExchangeRateData;

export interface ExchangeRateResponse {
  success: boolean;
  data: ExchangeRateData | ExchangeRateData[];
  error?: string;
}

export type ExchangeProvider = "bcv" | "binance";
