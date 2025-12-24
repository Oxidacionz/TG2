import { Database } from "./database.types";
import { DebtStatus, ExpenseCategory, TransactionType } from "./enums";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Account = Database["public"]["Tables"]["accounts"]["Row"];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type Contact = Database["public"]["Tables"]["contacts"]["Row"];
export type CashSession = Database["public"]["Tables"]["cash_sessions"]["Row"];
export type TransactionEvidence =
  Database["public"]["Tables"]["transaction_evidence"]["Row"];
export type RateHistory = Database["public"]["Tables"]["rates_history"]["Row"];
export type CurrentRate = Database["public"]["Tables"]["current_rates"]["Row"];

export interface Debt {
  id: number;
  type: TransactionType;
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
