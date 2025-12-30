import React from "react";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";

import { Badge } from "@core/ui/Badge";

import { TransactionWithDetails } from "../types";

interface Props {
  transaction: TransactionWithDetails;
}

const TransactionRow = React.memo((props: Props) => {
  const { transaction: tx } = props;

  return (
    <tr
      key={tx.id}
      className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
    >
      <td className="px-6 py-4">
        <div className="font-medium text-slate-900 dark:text-white">
          {new Date(tx.created_at).toLocaleDateString()}
        </div>
        <div className="font-mono text-xs text-slate-500">
          {tx.id.substring(0, 8)}
        </div>
      </td>

      <td className="px-6 py-4 font-mono text-slate-500">{tx.reference}</td>

      <td className="px-6 py-4">
        <div className="font-bold text-slate-900 dark:text-white">
          {tx.contacts?.full_name || "Desconocido"}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span
            className={`rounded p-1 ${
              tx.type === "income"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {tx.type === "income" ? (
              <LuArrowDown className="h-3 w-3" />
            ) : (
              <LuArrowUp className="h-3 w-3" />
            )}
          </span>
          <span className="font-bold dark:text-white">
            {tx.amount_usd} {tx.currency}
          </span>
        </div>
        {tx.service_fee_usd && tx.service_fee_usd > 0 ? (
          <div className="mt-1 text-xs text-slate-400">
            Comisión: {tx.service_fee_usd}
          </div>
        ) : null}
      </td>

      <td className="px-6 py-4">
        <div className="text-sm dark:text-slate-300">
          {tx.accounts?.name || "---"}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold uppercase dark:bg-slate-700 dark:text-white">
            {tx.profiles?.username?.charAt(0) || "?"}
          </div>
          <span className="max-w-25 truncate dark:text-slate-300">
            {tx.profiles?.username || "N/A"}
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="text-xs text-slate-500">Tasa: {tx.rate_internal}</div>
      </td>

      <td className="px-6 py-4">
        <Badge status={tx.status || "pending"} />
      </td>
    </tr>
  );
});

export default TransactionRow;

TransactionRow.displayName = "TransactionRow";
