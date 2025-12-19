import { useState } from "react";
import { Account } from "@shared";
import { AccountType, Currency } from "@/types/enums";
import { AccountFormData } from "../components/AccountFormModal";

export const useAccounts = () => {
  const [loading] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 1,
      bankName: "Mock Bank",
      holder: "Mock Holder",
      balance: 1000,
      currency: Currency.USD,
      type: AccountType.BANCO,
    },
  ]);

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
