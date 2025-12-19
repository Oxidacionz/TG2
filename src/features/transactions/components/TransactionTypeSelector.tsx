import { TransactionType } from "@/types/enums";

interface TransactionTypeSelectorProps {
  type: TransactionType;
  onChange: (type: TransactionType) => void;
}

export const TransactionTypeSelector = ({
  type,
  onChange,
}: TransactionTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
      <button
        onClick={() => onChange(TransactionType.INCOME)}
        type="button"
        className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-bold transition-all ${
          type === TransactionType.INCOME
            ? "bg-white text-green-600 shadow-sm dark:bg-slate-700"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <span className="text-lg">↘</span> COMPRA (Entrada)
      </button>
      <button
        onClick={() => onChange(TransactionType.EXPENSE)}
        type="button"
        className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-bold transition-all ${
          type === TransactionType.EXPENSE
            ? "bg-white text-red-600 shadow-sm dark:bg-slate-700"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        <span className="text-lg">↗</span> VENTA (Salida)
      </button>
    </div>
  );
};
