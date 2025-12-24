import { CurrentRate } from "@/types/domain";

export type ExchangeRate = CurrentRate;

export type ExchangeProvider = "bcv" | "binance";

export type ExchangeRateKey =
  | "BCV-USD"
  | "BCV-EUR"
  | "BCV-CNY"
  | "BCV-TRY"
  | "BCV-RUB"
  | "Binance-USDT_BUY"
  | "Binance-USDT_SELL"
  | "Internal-VES";

export interface ExchangeRateResponse {
  success: boolean;
  data: ExchangeRate | ExchangeRate[];
  error?: string;
}
