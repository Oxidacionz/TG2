import { TransactionType } from "@/types/enums";

interface TransactionSummaryCardProps {
  type: TransactionType;
  amount: number | string;
  rate: number | string;
  totalVES: string;
  calculatedProfit: number;
  amountUSD: number;
}

export const TransactionSummaryCard = ({
  type,
  amount,
  rate,
  totalVES,
  calculatedProfit,
  amountUSD,
}: TransactionSummaryCardProps) => {
  const amountNative = Number(amount) || 0;
  const rateNum = Number(rate) || 1;
  const isVES = amountUSD !== amountNative; // Simple heuristic or could pass currency prop.
  // Better to infer: if amountUSD != amount, then native was VES.
  // Actually, hook logic: amountUSD = currency === 'VES' ? amount / rate : amount.

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
        <h2 className="text-4xl font-bold">${amountUSD.toFixed(2)}</h2>
        <div className="text-right">
          <p className="text-xs uppercase opacity-70">Tasa</p>
          <p className="font-bold">{rate}</p>
        </div>
      </section>

      {/* Explicit Calculation Display */}
      {isVES && (
        <div className="mb-4 rounded bg-black/10 p-2 font-mono text-xs text-white/70">
          {amountNative.toFixed(2)} (VES) / {rateNum} = ${amountUSD.toFixed(2)}
        </div>
      )}

      <figure className="my-3 flex items-center justify-between rounded-lg bg-black/10 p-3">
        <div className="text-center">
          <p className="text-xs opacity-70">Monto Original</p>
          <p className="text-sm font-bold">{amountNative}</p>
        </div>
        <div className="text-white/50" aria-hidden="true">
          ➜
        </div>
        <div className="text-center">
          <p className="text-xs opacity-70">Total (Bs)</p>
          <p className="text-sm font-bold">Bs {totalVES}</p>
        </div>
      </figure>

      <footer className="flex items-center justify-between border-t border-white/10 pt-2">
        <span className="text-sm text-white/80">Comisión Bancaria</span>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-900 shadow-sm">
          -${calculatedProfit.toFixed(2)}
        </span>
      </footer>
    </article>
  );
};
