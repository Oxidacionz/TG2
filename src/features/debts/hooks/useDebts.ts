import { useState } from "react";
import { Debt } from "@shared";
import { TransactionType, DebtStatus } from "@/types/enums";
import { DebtFormData } from "../components/DebtFormModal";

export const useDebts = () => {
  const [loading] = useState<boolean>(false);
  const [activeType, setActiveType] = useState<TransactionType>(
    TransactionType.INCOME,
  );
  const [debts, setDebts] = useState<Debt[]>([
    {
      id: 1,
      type: TransactionType.INCOME,
      client_name: "Mock Client",
      amount: 500,
      status: DebtStatus.PENDING,
      due_date: new Date().toISOString(),
    },
  ]);

  const createDebt = (data: DebtFormData) => {
    console.log("Mock Create Debt:", data);
    // Service call would go here
  };

  return {
    debts,
    loading,
    activeType,
    setActiveType,
    createDebt,
  };
};
