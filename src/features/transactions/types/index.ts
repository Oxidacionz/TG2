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
  // Account Details
  amount_native: string;
  amount_usd?: number; // Optional derived
  amount_ves?: number; // Optional derived
  rate_internal: string;
  currency: "VES" | "USD";

  // Relations
  contact_id?: string;
  new_contact_tax_id?: string;
  new_contact_name?: string; // Compliance: Integrity
  account_id: string;

  // Financials
  profit: number;
  bank_commission_native?: string; // Compliance: Semantics
  service_fee_percent?: number | "custom";

  // Meta
  reference?: string;
  internal_notes?: string;
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
