import { TransactionDTO } from "../types";

export interface ITransactionService {
  createTransaction(transaction: TransactionDTO): Promise<void>;
}

class MockTransactionService implements ITransactionService {
  async createTransaction(transaction: TransactionDTO): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("SERVICE: Transaction Created", transaction);
  }
}

export const transactionService = new MockTransactionService();
