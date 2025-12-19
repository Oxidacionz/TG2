import { useState } from "react";
import { Button } from "@core/ui/Button";
import { LuPlus } from "react-icons/lu";
import { AccountsList } from "@features/accounts/components/AccountsList";
import { DebtsList } from "@features/debts/components/DebtsList";
import {
  AccountFormModal,
  AccountFormData,
} from "@features/accounts/components/AccountFormModal";
import {
  DebtFormModal,
  DebtFormData,
} from "@features/debts/components/DebtFormModal";
import { useAccounts } from "@features/accounts/hooks/useAccounts";
import { useDebts } from "@features/debts/hooks/useDebts";

export const TreasuryPage = () => {
  const [activeTab, setActiveTab] = useState<"ACCOUNTS" | "DEBTS">("ACCOUNTS");

  const { accounts, loading, createAccount } = useAccounts();
  const {
    debts,
    loading: debtsLoading,
    activeType: debtType,
    setActiveType: setDebtType,
    createDebt,
  } = useDebts();

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);

  const handleCreateAccount = (data: AccountFormData) => {
    createAccount(data);
  };

  const handleCreateDebt = (data: DebtFormData) => {
    createDebt(data);
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
          loading={debtsLoading}
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
