import React from "react";
import { Badge } from "@core/ui/Badge";
import { Transaction } from "../types";

interface Props {
  transaction: Transaction;
}

export const TransactionRow = React.memo((props: Props) => {
  const { transaction: tx } = props;

  return (
    <tr
      key={tx.id}
      className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
    >
      {/* FECHA / ID */}
      <td className="px-6 py-4">
        <div className="font-medium text-slate-900 dark:text-white">
          {tx.date}
        </div>
        <div className="font-mono text-xs text-slate-500">{tx.id}</div>
      </td>

      {/* REFERENCIA */}
      <td className="px-6 py-4 font-mono text-slate-500">{tx.ref}</td>

      {/* CLIENTE */}
      <td className="px-6 py-4">
        <div className="font-bold text-slate-900 dark:text-white">
          {tx.client}
        </div>
        <div className="text-xs text-slate-500">{tx.clientBank}</div>
      </td>

      {/* MONTO */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span
            className={`rounded p-1 ${
              tx.type === "ENTRADA"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {tx.type === "ENTRADA" ? (
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            ) : (
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                ></path>
              </svg>
            )}
          </span>
          <span className="font-bold dark:text-white">
            {tx.amount} {tx.currency}
          </span>
        </div>
        {tx.commission && tx.commission > 0 ? (
          <div className="mt-1 text-xs text-slate-400">
            Comisión: {tx.commission}
          </div>
        ) : null}
      </td>

      {/* CUENTA INT. */}
      <td className="px-6 py-4">
        <div className="text-sm dark:text-slate-300">
          {tx.targetAccount || "---"}
        </div>
      </td>

      {/* OPERADOR */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold uppercase dark:bg-slate-700 dark:text-white">
            {tx.operator.charAt(0)}
          </div>
          <span className="max-w-[100px] truncate dark:text-slate-300">
            {tx.operator}
          </span>
        </div>
      </td>

      {/* TASA / GANANCIA */}
      <td className="px-6 py-4">
        <div className="text-xs text-slate-500">Tasa: {tx.rate}</div>
        <div className="text-xs font-bold text-green-600">+{tx.profit} USD</div>
      </td>

      {/* ESTADO */}
      <td className="px-6 py-4">
        <Badge status={tx.status} />
      </td>
    </tr>
  );
});

TransactionRow.displayName = "TransactionRow";
