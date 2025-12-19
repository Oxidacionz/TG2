import {
  TransactionType,
  Currency,
  AccountType,
  DebtStatus,
  ExpenseCategory,
} from "./enums";

// Removed type alias as it's now an Enum imported above

export interface ExchangeRateData {
  from: string;
  to: string;
  rate: number;
  source: string;
  timestamp: string;
}

export interface ExchangeRateResponse {
  success: boolean;
  data: ExchangeRateData | ExchangeRateData[];
  error?: string;
}

export type ExchangeProvider = "bcv" | "binance";
