import { useState } from "react";
import { Account } from "@domain";
import { AccountType, Currency } from "@/types/enums";
import { AccountFormData } from "../components/AccountFormModal";

const MOCK_ACCOUNTS: Account[] = [
  {
    id: 1,
    bankName: "Mock Bank",
    holder: "Mock Holder",
    balance: 1000,
    currency: Currency.USD,
    type: AccountType.BANCO,
  },
];

export const useAccounts = () => {
  const [loading] = useState<boolean>(false);
  const [accounts] = useState<Account[]>(MOCK_ACCOUNTS);

  const createAccount = (data: AccountFormData) => {
    console.log("Mock Create Account:", data);
    // Here we would call a service
    // const newAccount = await accountService.create(data);
    // setAccounts([...accounts, newAccount]);
  };

  return {
    accounts,
    loading,
    createAccount,
  };
};
