import {
  AccountType,
  Currency,
  DebtStatus,
  TransactionType,
  ExpenseCategory,
} from "../enums";

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
