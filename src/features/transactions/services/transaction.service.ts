import { TransactionDTO } from "../types";

export interface ITransactionService {
  createTransaction(transaction: TransactionDTO): Promise<void>;
}

class MockTransactionService implements ITransactionService {
  async createTransaction(transaction: TransactionDTO): Promise<void> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("SERVICE: Transaction Created", transaction);
    // In a real app, this would be: await supabase.from('transactions').insert(transaction)
  }
}

export const transactionService = new MockTransactionService();
