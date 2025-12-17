// COMPONENTE CRITICO

import { useState } from "react";
import {
  Account,
  AccountType,
  Currency,
  Debt,
  DebtStatus,
  TransactionType,
} from "../types";
import { Button } from "../components/atoms/Button";
import { LuPlus } from "react-icons/lu";

// Organisms/Molecules
import { AccountsList } from "../components/organisms/AccountsList";
import { DebtsList } from "../components/organisms/DebtsList";
import {
  AccountFormModal,
  AccountFormData,
} from "../components/organisms/AccountFormModal";
import {
  DebtFormModal,
  DebtFormData,
} from "../components/organisms/DebtFormModal";

export const AccountsView = () => {
  const [activeTab, setActiveTab] = useState<"ACCOUNTS" | "DEBTS">("ACCOUNTS");
  const [debtType, setDebtType] = useState<TransactionType>(
    TransactionType.INCOME,
  );

  // Data State
  const [accounts] = useState<Account[]>([
    {
      id: 1,
      bankName: "Mock Bank",
      holder: "Mock Holder",
      balance: 1000,
      currency: Currency.USD,
      type: AccountType.BANCO,
    },
  ]);
  const [debts] = useState<Debt[]>([
    {
      id: 1,
      type: TransactionType.INCOME,
      client_name: "Mock Client",
      amount: 500,
      status: DebtStatus.PENDING,
      due_date: new Date().toISOString(),
    },
  ]);
  const [loading] = useState<boolean>(false);

  // Modals
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);

  const handleCreateAccount = (data: AccountFormData) => {
    console.log("Mock Create Account:", data);
    // fetchAll();
  };

  const handleCreateDebt = (data: DebtFormData) => {
    console.log("Mock Create Debt:", data);
    // fetchAll();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Tesorería
          </h2>
          <p className="text-sm text-slate-500">
            Control de cuentas bancarias y deudas.
          </p>
        </div>
        {activeTab === "ACCOUNTS" && (
          <Button onClick={() => setIsAccountModalOpen(true)} icon={<LuPlus />}>
            Agregar Cuenta
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab("ACCOUNTS")}
          className={`border-b-2 px-2 pb-2 font-medium ${
            activeTab === "ACCOUNTS"
              ? "border-brand-600 text-brand-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Mis Cuentas
        </button>
        <button
          onClick={() => setActiveTab("DEBTS")}
          className={`border-b-2 px-2 pb-2 font-medium ${
            activeTab === "DEBTS"
              ? "border-brand-600 text-brand-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Deudas
        </button>
      </div>

      {/* Content */}
      {activeTab === "ACCOUNTS" ? (
        <AccountsList accounts={accounts} loading={loading} />
      ) : (
        <DebtsList
          debts={debts}
          debtType={debtType}
          setDebtType={setDebtType}
          onAddDebt={() => setIsDebtModalOpen(true)}
          loading={loading}
        />
      )}

      {/* Modals */}
      <AccountFormModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onSubmit={handleCreateAccount}
      />

      <DebtFormModal
        isOpen={isDebtModalOpen}
        onClose={() => setIsDebtModalOpen(false)}
        onSubmit={handleCreateDebt}
        type={debtType}
      />
    </div>
  );
};
