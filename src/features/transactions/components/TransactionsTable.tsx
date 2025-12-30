import { GrTransaction } from "react-icons/gr";

import { Card } from "@core/layout/Card";
import { Button } from "@core/ui/Button";

import { TransactionWithDetails } from "../types";
import TransactionRow from "./TransactionRow";

interface Props {
  transactions: TransactionWithDetails[];
  loading: boolean;
  onScan?: () => void;
}

const columns = [
  { title: "FECHA", key: crypto.randomUUID() },
  { title: "REFERENCIA", key: crypto.randomUUID() },
  { title: "CLIENTE", key: crypto.randomUUID() },
  { title: "MONTO", key: crypto.randomUUID() },
  { title: "CUENTA", key: crypto.randomUUID() },
  { title: "OPERADOR", key: crypto.randomUUID() },
  { title: "TASA", key: crypto.randomUUID() },
  { title: "ESTADO", key: crypto.randomUUID() },
];

const TransactionRowSkeleton = () => {
  return (
    <tr className="animate-pulse border-b border-slate-100 dark:border-slate-800">
      {[...Array(8)].map((_, _index) => (
        <td key={crypto.randomUUID()} className="px-6 py-4">
          <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-700"></div>
        </td>
      ))}
    </tr>
  );
};

const TransactionsTable = (props: Props) => {
  const { transactions, loading, onScan } = props;

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {loading ? (
              // Loading State (5 Skeletons)
              [...Array(5)].map((_, i) => <TransactionRowSkeleton key={i} />)
            ) : transactions.length > 0 ? (
              // Data State
              transactions.map((tx) => (
                <TransactionRow key={tx.id} transaction={tx} />
              ))
            ) : (
              // Empty State
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
      </div>
    </Card>
  );
};

export default TransactionsTable;
