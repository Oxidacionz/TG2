import { TransactionType } from "@/types/enums";

interface TransactionSummaryCardProps {
  type: TransactionType;
  amount: number | string;
  rate: number | string;
  totalVES: string;
  calculatedProfit: number;
}

export const TransactionSummaryCard = ({
  type,
  amount,
  rate,
  totalVES,
  calculatedProfit,
}: TransactionSummaryCardProps) => {
  return (
    <article
      className={`rounded-2xl p-6 text-white shadow-lg ${
        type === TransactionType.INCOME
          ? "bg-linear-to-br from-green-600 to-teal-800"
          : "bg-linear-to-br from-red-600 to-rose-800"
      }`}
    >
      <header className="mb-4 flex items-center justify-between">
        <span className="rounded bg-black/20 px-2 py-1 text-[10px] font-bold tracking-wider uppercase">
          {type === TransactionType.INCOME ? "Recibimos" : "Enviamos"}
        </span>
        <span className="text-sm font-medium opacity-80">
          {type === TransactionType.INCOME ? "Cliente Paga" : "Cliente Recibe"}
        </span>
      </header>

      <section className="mb-2 flex items-center justify-between">
        <h2 className="text-4xl font-bold">${amount || "0.00"}</h2>
        <div className="text-right">
          <p className="text-xs uppercase opacity-70">Tasa</p>
          <p className="font-bold">{rate}</p>
        </div>
      </section>

      {/* Flow Visualizer */}
      <figure className="my-3 flex items-center justify-between rounded-lg bg-black/10 p-3">
        <div className="text-center">
          <p className="text-xs opacity-70">
            {type === TransactionType.INCOME ? "USD" : "VES"}
          </p>
          <p className="text-sm font-bold">
            {type === TransactionType.INCOME
              ? `$${amount || 0}`
              : `Bs ${totalVES}`}
          </p>
        </div>
        <div className="text-white/50" aria-hidden="true">
          ➜
        </div>
        <div className="text-center">
          <p className="text-xs opacity-70">
            {type === TransactionType.INCOME ? "VES" : "USD"}
          </p>
          <p className="text-sm font-bold">
            {type === TransactionType.INCOME
              ? `Bs ${totalVES}`
              : `$${amount || 0}`}
          </p>
        </div>
      </figure>

      <footer className="flex items-center justify-between border-t border-white/10 pt-2">
        <span className="text-sm text-white/80">Ganancia Estimada</span>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-900 shadow-sm">
          +${calculatedProfit.toFixed(2)}
        </span>
      </footer>
    </article>
  );
};
