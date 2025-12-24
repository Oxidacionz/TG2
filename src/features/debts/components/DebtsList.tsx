import { Debt } from "@domain";
import { LuPlus } from "react-icons/lu";

import { Button } from "@core/ui/Button";

import { TransactionType } from "@/types/enums";

import { DebtCard } from "./DebtCard";

interface Props {
  debts: Debt[];
  debtType: TransactionType;
  setDebtType: (type: TransactionType) => void;
  onAddDebt: () => void;
  loading?: boolean;
}

export const DebtsList = (props: Props) => {
  const { debts, debtType, setDebtType, onAddDebt, loading = false } = props;

  const filteredDebts = debts.filter((d) => d.type === debtType);

  if (loading) return <p className="text-slate-500">Cargando deudas...</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
        <div className="flex gap-2">
          <button
            onClick={() => setDebtType(TransactionType.INCOME)}
            className={`rounded-md px-4 py-2 text-sm font-bold transition-all ${
              debtType === TransactionType.INCOME
                ? "bg-white text-green-700 shadow"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Por Cobrar (Entradas)
          </button>
          <button
            onClick={() => setDebtType(TransactionType.EXPENSE)}
            className={`rounded-md px-4 py-2 text-sm font-bold transition-all ${
              debtType === TransactionType.EXPENSE
                ? "bg-white text-red-700 shadow"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Por Pagar (Salidas)
          </button>
        </div>
        <Button size="sm" onClick={onAddDebt} icon={<LuPlus />}>
          Registrar
        </Button>
      </div>

      {filteredDebts.length === 0 ? (
        <p className="py-10 text-center text-slate-500">
          No hay deudas registradas.
        </p>
      ) : (
        filteredDebts.map((debt) => <DebtCard key={debt.id} debt={debt} />)
      )}
    </div>
  );
};
