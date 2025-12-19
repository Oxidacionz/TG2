import { useState } from "react";
import { Debt } from "@domain";
import { TransactionType, DebtStatus } from "@/types/enums";
import { DebtFormData } from "../components/DebtFormModal";

// Assuming MOCK_DEBTS is defined elsewhere or will be defined.
// For the purpose of this edit, we'll define a placeholder if not provided.
// If MOCK_DEBTS is not defined, this will cause a reference error.
// The instruction implies MOCK_DEBTS replaces the inline array.
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
