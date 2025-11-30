import { useEffect, useState } from "react";
import { ICONS } from "../components/atoms/Icons";

import { Button } from "../components/atoms/Button";
import { Card } from "../components/atoms/Card";
import { Input } from "../components/atoms/Input";
import { Badge } from "../components/atoms/Badge";
import { MOCK_DATA } from "../mocks/mockData";

export const TransactionsView = ({
  onScan,
  refreshTrigger,
}: {
  onScan: () => void;
  refreshTrigger?: number;
}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        setTransactions(MOCK_DATA.transactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [refreshTrigger]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Transacciones
          </h2>
          <p className="text-sm text-slate-500">
            Historial de operaciones y estados
          </p>
        </div>
        <Button variant="primary" onClick={onScan} icon={<ICONS.Scan />}>
          Escanear / Nuevo
        </Button>
      </div>
      <Card className="flex flex-col gap-4 p-4 md:flex-row">
        <div className="relative flex-1">
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            <ICONS.Search />
          </div>
          <Input
            placeholder="Buscar por cliente, referencia o nota..."
            className="pl-10"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <select className="focus:ring-brand-500 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            <option>Todos los Tipos</option>
            <option>Entrada</option>
            <option>Salida</option>
          </select>
          <select className="focus:ring-brand-500 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
            <option>Todos los Estados</option>
            <option>Completado</option>
            <option>Pendiente</option>
          </select>
        </div>
      </Card>

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
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 dark:text-white">
                          {tx.date}
                        </div>
                        <div className="font-mono text-xs text-slate-500">
                          {tx.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-500">
                        {tx.ref}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {tx.client}
                        </div>
                        <div className="text-xs text-slate-500">
                          {tx.clientBank}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded p-1 ${tx.type === "ENTRADA" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
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
                      <td className="px-6 py-4">
                        <div className="text-sm dark:text-slate-300">
                          {tx.targetAccount || "---"}
                        </div>
                      </td>
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
                      <td className="px-6 py-4">
                        <div className="text-xs text-slate-500">
                          Tasa: {tx.rate}
                        </div>
                        <div className="text-xs font-bold text-green-600">
                          +{tx.profit} USD
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge status={tx.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <ICONS.Transactions />
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
    </div>
  );
};
