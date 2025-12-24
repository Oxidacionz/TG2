import { CreateTransactionDTO } from "../types";

export interface ITransactionService {
  createTransaction(transaction: CreateTransactionDTO): Promise<void>;
}

class MockTransactionService implements ITransactionService {
  async createTransaction(transaction: CreateTransactionDTO): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("SERVICE: Transaction Created", transaction);
  }
}

export const transactionService = new MockTransactionService();
