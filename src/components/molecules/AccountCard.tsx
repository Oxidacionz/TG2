import React from "react";
import { Account, AccountType } from "../../types";
import { Card } from "../atoms/Card";

interface Props {
  account: Account;
}

export const AccountCard = React.memo((props: Props) => {
  const { account: acc } = props;

  return (
    <Card className="group relative overflow-hidden p-6 transition-all hover:shadow-lg">
      <div className="absolute top-0 right-0 rounded-bl-lg bg-slate-100 p-2 text-xs font-bold text-slate-500 dark:bg-slate-700">
        {acc.currency}
      </div>
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white shadow-lg ${
            acc.type === AccountType.WALLET
              ? "bg-yellow-500"
              : acc.type === AccountType.EFECTIVO
                ? "bg-green-500"
                : "bg-blue-600"
          }`}
        >
          {acc.type === AccountType.WALLET
            ? "₿"
            : acc.type === AccountType.EFECTIVO
              ? "$"
              : "🏛"}
        </div>
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white">
            {acc.bankName}
          </h3>
          <p className="text-xs text-slate-500 uppercase">{acc.type}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs text-slate-400">Saldo Actual</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">
          {acc.balance.toLocaleString()}{" "}
          <span className="text-sm font-normal text-slate-500">
            {acc.currency}
          </span>
        </p>
      </div>
      <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-700">
        <p className="truncate text-xs text-slate-500">{acc.holder}</p>
      </div>
    </Card>
  );
});

AccountCard.displayName = "AccountCard";
