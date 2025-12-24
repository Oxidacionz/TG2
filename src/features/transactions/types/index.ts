import { Transaction as DomainTransaction } from "@/types/domain";
import { TransactionType } from "@/types/enums";

export * from "@/types/enums";

// Re-export domain type
export type Transaction = DomainTransaction;

export type TransactionWithDetails = DomainTransaction & {
  contacts: { full_name: string } | null;
  accounts: { name: string; currency: "VES" | "USD" } | null;
  profiles?: { username: string } | null; // created_by join
};

export interface CreateTransactionDTO {
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
