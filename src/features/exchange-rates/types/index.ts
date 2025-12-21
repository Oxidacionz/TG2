export interface ExchangeRate {
  id: number;
  source: string; // e.g., 'bcv', 'binance'
  symbol: string; // e.g., 'USD', 'USDT_BUY', 'USDT_SELL'
  value: number;
  updated_at: string;
}

export type ExchangeProvider = "bcv" | "binance";

// Define supported keys for autocomplete
export type ExchangeRateKey =
  | "BCV-USD"
  | "BCV-EUR"
  | "BCV-CNY"
  | "BCV-TRY"
  | "BCV-RUB"
  | "Binance-USDT_BUY"
  | "Binance-USDT_SELL";

export interface ExchangeRateResponse {
  success: boolean;
  data: ExchangeRate | ExchangeRate[];
  error?: string;
}
