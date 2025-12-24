import { Account } from "@domain";
import { useState } from "react";

import { AccountFormData } from "../components/AccountFormModal";

const MOCK_ACCOUNTS: Account[] = [
  {
    id: "1",
    name: "Mock Bank",
    current_balance: 1000,
    currency: "USD",
    bank_code: "0105",
    created_at: new Date().toISOString(),
    document_identity: "V-12345678",
    is_active: true,
    phone_linked: null,
  },
];

export const useAccounts = () => {
  const [loading] = useState<boolean>(false);
  const [accounts] = useState<Account[]>(MOCK_ACCOUNTS);

  const createAccount = (data: AccountFormData) => {
    console.log("Mock Create Account:", data);
    console.log("Mock Create Account:", data);
  };

  return {
    accounts,
    loading,
    createAccount,
  };
};
