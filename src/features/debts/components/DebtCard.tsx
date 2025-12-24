import { Debt } from "@domain";
import React from "react";
import { LuArrowRight } from "react-icons/lu";

import { Card } from "@core/layout/Card";

import { DebtStatus, TransactionType } from "@/types/enums";

interface Props {
  debt: Debt;
}

export const DebtCard = React.memo((props: Props) => {
  const { debt } = props;

  const isOverdue = (dateString?: string) => {
    if (!dateString) return false;
    return (
      new Date(dateString) < new Date() &&
      new Date(dateString).toDateString() !== new Date().toDateString()
    );
  };

  const overdue = isOverdue(debt.due_date);

  return (
    <Card
      className={`flex flex-col items-center justify-between border-l-4 p-4 md:flex-row ${
        debt.type === TransactionType.INCOME
          ? "border-l-green-500"
          : "border-l-red-500"
      } ${overdue ? "bg-red-50 dark:bg-red-900/10" : ""}`}
    >
      <div className="mb-2 flex w-full items-center gap-4 md:mb-0 md:w-auto">
        <div
          className={`shrink-0 rounded-full p-3 ${
            debt.type === TransactionType.INCOME
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          <LuArrowRight />
        </div>
        <div>
          <h4 className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
            {debt.client_name}
            {overdue && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 uppercase">
                Vencido
              </span>
            )}
          </h4>
          <p className="text-xs text-slate-500">
            {debt.platform ? `Vía: ${debt.platform}` : "Sin plataforma"}
            {debt.due_date &&
              ` • Vence: ${new Date(debt.due_date).toLocaleDateString()}`}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-between text-right md:w-auto md:flex-col md:items-end">
        <p
          className={`text-lg font-bold ${
            debt.type === TransactionType.INCOME
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {debt.type === TransactionType.INCOME ? "+" : "-"}$
          {debt.amount.toLocaleString()}
        </p>
        <span
          className={`rounded-full px-2 py-0.5 text-xs ${
            debt.status === DebtStatus.PAID
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {debt.status}
        </span>
      </div>
    </Card>
  );
});

DebtCard.displayName = "DebtCard";
