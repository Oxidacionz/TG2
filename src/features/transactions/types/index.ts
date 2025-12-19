export * from "@/types/enums";
import { TransactionType, Currency } from "@/types/enums";

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
