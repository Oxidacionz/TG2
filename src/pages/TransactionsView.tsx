
import  { useEffect, useState } from 'react';
import { ICONS } from "../components/atoms/Icons"

import { Button } from "../components/atoms/Button"
import { Card } from '../components/atoms/Card'
import { Input } from '../components/atoms/Input'
import { Badge } from '../components/atoms/Badge'
import { supabase } from '../lib/supabaseClient'
import { MOCK_DATA } from '../mocks/mockData';

export const TransactionsView = ({ onScan, refreshTrigger }: { onScan: () => void, refreshTrigger?: number }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          // Mapear datos de DB a formato frontend
          const mappedData = data.map((item: any) => ({
            id: item.id.substring(0, 8),
            date: new Date(item.created_at).toLocaleDateString(),
            ref: item.reference || 'S/R',
            client: item.client_name || 'Desconocido',
            clientBank: item.client_bank || '---',
            amount: item.amount,
            currency: item.currency,
            type: item.type,
            operator: item.operator_name || 'Sistema',
            rate: item.rate,
            profit: item.profit,
            status: item.status,
            // Nuevos campos mapeados
            targetAccount: item.target_account,
            commission: item.commission
          }));
          setTransactions(mappedData);
        } else {
          setTransactions([]);
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setTransactions(MOCK_DATA.transactions);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [refreshTrigger]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Transacciones</h2>
            <p className="text-sm text-slate-500">Historial de operaciones y estados</p>
        </div>
        <Button variant="primary" onClick={onScan} icon={<ICONS.Scan />}>Escanear / Nuevo</Button>
      </div>
      <Card className="p-4 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><ICONS.Search /></div>
            <Input placeholder="Buscar por cliente, referencia o nota..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none dark:text-white">
                <option>Todos los Tipos</option>
                <option>Entrada</option>
                <option>Salida</option>
            </select>
            <select className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none dark:text-white">
                <option>Todos los Estados</option>
                <option>Completado</option>
                <option>Pendiente</option>
            </select>
          </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-8 text-center text-slate-500 animate-pulse">Cargando transacciones...</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">FECHA / ID</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">REFERENCIA</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">CLIENTE</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">MONTO</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">CUENTA INT.</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">OPERADOR</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">TASA / GANANCIA</th>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">ESTADO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-slate-900 dark:text-white font-medium">{tx.date}</div>
                        <div className="text-xs text-slate-500 font-mono">{tx.id}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-mono">{tx.ref}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white">{tx.client}</div>
                        <div className="text-xs text-slate-500">{tx.clientBank}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <span className={`p-1 rounded ${tx.type === 'ENTRADA' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {tx.type === 'ENTRADA' ? <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg> : <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>}
                            </span>
                            <span className="font-bold dark:text-white">{tx.amount} {tx.currency}</span>
                        </div>
                        {tx.commission && tx.commission > 0 ? (
                           <div className="text-xs text-slate-400 mt-1">Comisión: {tx.commission}</div>
                        ) : null}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm dark:text-slate-300">{tx.targetAccount || '---'}</div>
                      </td>
                      <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold dark:text-white uppercase">{tx.operator.charAt(0)}</div>
                            <span className="dark:text-slate-300 truncate max-w-[100px]">{tx.operator}</span>
                          </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-slate-500">Tasa: {tx.rate}</div>
                        <div className="text-green-600 text-xs font-bold">+{tx.profit} USD</div>
                      </td>
                      <td className="px-6 py-4"><Badge status={tx.status} /></td>
                    </tr>
                  ))
                ) : (
                   <tr>
                     <td colSpan={8} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center text-slate-400">
                            <ICONS.Transactions />
                            <p className="mt-2 text-sm">No hay transacciones registradas aún.</p>
                            <Button variant="ghost" size="sm" className="mt-2" onClick={onScan}>Registrar la primera</Button>
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
