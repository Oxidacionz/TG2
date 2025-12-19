import { GrTransaction } from "react-icons/gr";
import { Transaction } from "../types";
import { Button } from "@core/ui/Button";
import { Card } from "@core/layout/Card";
import { TransactionRow } from "./TransactionRow";

interface Props {
  transactions: Transaction[];
  loading: boolean;
  onScan?: () => void;
}

export const TransactionsTable = (props: Props) => {
  const { transactions, loading, onScan } = props;

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="animate-pulse p-8 text-center text-slate-500">
            Cargando transacciones...
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">
                  FECHA / ID
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">
                  REFERENCIA
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">
                  CLIENTE
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">
                  MONTO
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">
                  CUENTA INT.
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">
                  OPERADOR
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">
                  TASA / GANANCIA
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">
                  ESTADO
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <TransactionRow key={tx.id} transaction={tx} />
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <GrTransaction className="h-6 w-6" />
                      <p className="mt-2 text-sm">
                        No hay transacciones registradas aún.
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2"
                        onClick={onScan}
                      >
                        Registrar la primera
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Card>
  );
};
