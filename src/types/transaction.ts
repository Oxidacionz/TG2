import { TRANSACTION_TYPES } from "../config/constants";

export interface TransactionDTO {
  type: typeof TRANSACTION_TYPES.INCOME | typeof TRANSACTION_TYPES.EXPENSE;
  amount: string;
  rate: string;
  profit: number;
  clientName: string;
  clientBank?: string;
  targetAccount: string;
  notes?: string;
  user?: string;
}
