import { Card } from "../atoms/Card";
import { Badge } from "../atoms/Badge";
import { MOCK_DATA } from "../../mocks/mockData";

export const TransactionsTable = () => {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
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
                OPERADOR
              </th>
              <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">
                TASA / GANANCIA
              </th>
              <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">
                ESTADO
              </th>
              <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">
                ACCIONES
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {MOCK_DATA.transactions.map((tx) => (
              <tr
                key={tx.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900 dark:text-white">
                    {tx.date}
                  </div>
                  <div className="text-xs text-slate-500">{tx.id}</div>
                </td>
                <td className="px-6 py-4 font-mono text-slate-500">{tx.ref}</td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900 dark:text-white">
                    {tx.client}
                  </div>
                  <div className="text-xs text-slate-500">{tx.clientBank}</div>
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
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-bold dark:bg-slate-700 dark:text-white">
                      {tx.operator.charAt(0)}
                    </div>
                    <span className="dark:text-slate-300">{tx.operator}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-slate-500">Tasa: {tx.rate}</div>
                  <div className="text-xs font-bold text-green-600">
                    +{tx.profit} USD
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge status={tx.status} />
                </td>
                <td className="px-6 py-4 text-center text-slate-400">--</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
