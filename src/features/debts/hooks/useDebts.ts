import { Debt } from "@domain";
import { useState } from "react";

import { DebtStatus, TransactionType } from "@/types/enums";

import { DebtFormData } from "../components/DebtFormModal";

const MOCK_DEBTS: Debt[] = [
  {
    id: 1,
    type: TransactionType.INCOME,
    client_name: "Mock Client",
    amount: 500,
    status: DebtStatus.PENDING,
    due_date: new Date().toISOString(),
  },
];

export const useDebts = () => {
  const [loading] = useState<boolean>(false);
  const [activeType, setActiveType] = useState<TransactionType>(
    TransactionType.INCOME,
  );
  const [debts] = useState<Debt[]>(MOCK_DEBTS);

  const createDebt = (data: DebtFormData) => {
    console.log("Mock Create Debt:", data);
  };

  return {
    debts,
    loading,
    activeType,
    setActiveType,
    createDebt,
  };
};
