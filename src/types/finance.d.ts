import {
  TransactionType,
  Currency,
  AccountType,
  DebtStatus,
  ExpenseCategory,
} from "./enums";

// Removed type alias as it's now an Enum imported above

export interface Transaction {
  id: string; // e.g. "#t1"
  date: string; // e.g. "28/11/2025"
  ref: string;
  client: string;
  clientBank?: string;
  amount: number;
  currency: Currency;
  type: TransactionType;
  operator: string;
  rate: number;
  profit: number;
  status: string; // e.g. "Completado", "Pendiente"
  targetAccount?: string; // Optional as it wasn't in all mocks but used in view
  commission?: number; // Optional
  notes?: string;
}

export interface TransactionDTO {
  type: TransactionType;
  amount: string;
  rate: string;
  profit: number;
  clientName: string;
  clientBank?: string;
  targetAccount: string;
  notes?: string;
  user?: string;
}

export interface Account {
  id: number;
  bankName: string;
  accountNumber?: string;
  holder: string;
  balance: number;
  currency: Currency;
  type: AccountType;
}

export interface Debt {
  id: number;
  type: TransactionType; // "COBRAR" | "PAGAR" maps to INCOME/EXPENSE conceptually or we might need separate type if strict. Assuming TransactionType for flow direction or create new DebtType.
  // Wait, Debt "COBRAR" implies we will receive money (INCOME), "PAGAR" implies we will pay (EXPENSE).
  // But typically DebtType is specific. I didn't create DebtType enum.
  // Let's use string union for now if ambiguous or create generic DebtType.
  // Actually, I missed creating DebtType. Let's stick effectively to strict string or better, recreate DebtType enum.
  // I will leave Debt as is for a moment or use TransactionType if it fits?
  // "COBRAR" != "ENTRADA".
  // I will use string literal for Debt.type for now to avoid breaking logic if I guessed wrong, but I CAN use DebtStatus.
  type: "COBRAR" | "PAGAR";
  client_name: string;
  amount: number;
  status: DebtStatus;
  due_date: string;
  platform?: string;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

export interface ReportRow {
  id: number;
  created_at: string;
  type: TransactionType; // Was string
  client_name: string;
  amount: number;
  rate: number;
  profit: number;
  operator_name: string;
  status: string;
}

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
