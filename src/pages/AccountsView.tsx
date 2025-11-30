
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'
import { Card } from '../components/atoms/Card'
import { Button } from '../components/atoms/Button'
import { Input } from '../components/atoms/Input'
import { ICONS } from '../components/atoms/Icons'
import { Modal } from '../components/organisms/Modal'
import { FormField } from '../components/molecules/FormField'


export const AccountsView = () => {
  const [activeTab, setActiveTab] = useState<'ACCOUNTS' | 'DEBTS'>('ACCOUNTS');
  const [debtType, setDebtType] = useState<'COBRAR' | 'PAGAR'>('COBRAR');

  // Data State
  const [accounts, setAccounts] = useState([]);
  const [debts, setDebts] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Modals
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);

  // Form State (Accounts)
  const [bankName, setBankName] = useState('');
  const [holderName, setHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [balance, setBalance] = useState('');
  const [type, setType] = useState('BANCO');

  // Form State (Debts)
  const [debtClient, setDebtClient] = useState('');
  const [debtPlatform, setDebtPlatform] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [debtDueDate, setDebtDueDate] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    // Fetch Accounts
    const { data: accData } = await supabase.from('accounts').select('*').order('bank_name');
    if (accData) setAccounts(accData as any);

    // Fetch Debts
    const { data: debtData } = await supabase.from('debts').select('*').order('due_date', { ascending: true });
    if (debtData) setDebts(debtData as any);

    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreateAccount = async () => {
    if (!bankName || !holderName) return alert('Datos obligatorios');
    const { error } = await supabase.from('accounts').insert({
      bank_name: bankName,
      holder_name: holderName,
      account_number: accountNumber,
      currency,
      balance: parseFloat(balance) || 0,
      type
    });
    if (error) alert('Error: ' + error.message);
    else {
      setIsAccountModalOpen(false);
      fetchAll();
    }
  };

  const handleCreateDebt = async () => {
      if(!debtClient || !debtAmount) return alert('Datos obligatorios');
      const { error } = await supabase.from('debts').insert({
          type: debtType,
          client_name: debtClient,
          platform: debtPlatform,
          amount: parseFloat(debtAmount),
          currency: 'USD',
          due_date: debtDueDate || null,
          status: 'PENDIENTE'
      });
      if(error) alert('Error: ' + error.message);
      else {
          setIsDebtModalOpen(false);
          setDebtClient('');
          setDebtPlatform('');
          setDebtAmount('');
          setDebtDueDate('');
          fetchAll();
      }
  };

  const isOverdue = (dateString?: string) => {
      if (!dateString) return false;
      return new Date(dateString) < new Date() && new Date(dateString).toDateString() !== new Date().toDateString();
  };

  const renderAccountsList = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map(acc => (
            <Card key={acc.id} className="p-6 relative overflow-hidden group hover:shadow-lg transition-all">
                <div className="absolute top-0 right-0 p-2 bg-slate-100 dark:bg-slate-700 rounded-bl-lg text-xs font-bold text-slate-500">
                    {acc.currency}
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg ${acc.type === 'WALLET' ? 'bg-yellow-500' : acc.type === 'EFECTIVO' ? 'bg-green-500' : 'bg-blue-600'}`}>
                        {acc.type === 'WALLET' ? '₿' : acc.type === 'EFECTIVO' ? '$' : '🏛'}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-white">{acc.bank_name}</h3>
                        <p className="text-xs text-slate-500 uppercase">{acc.type}</p>
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-xs text-slate-400">Saldo Actual</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {acc.balance.toLocaleString()} <span className="text-sm font-normal text-slate-500">{acc.currency}</span>
                    </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                    <p className="text-xs text-slate-500 truncate">{acc.holder_name}</p>
                </div>
            </Card>
        ))}
        {accounts.length === 0 && <p className="col-span-3 text-center text-slate-500">No hay cuentas registradas.</p>}
      </div>
  );

  const renderDebtsList = () => {
      const filteredDebts = debts.filter(d => d.type === debtType);
      return (
          <div className="space-y-4">
              <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                  <div className="flex gap-2">
                     <button onClick={() => setDebtType('COBRAR')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${debtType === 'COBRAR' ? 'bg-white shadow text-green-700' : 'text-slate-500 hover:text-slate-700'}`}>Por Cobrar (Entradas)</button>
                     <button onClick={() => setDebtType('PAGAR')} className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${debtType === 'PAGAR' ? 'bg-white shadow text-red-700' : 'text-slate-500 hover:text-slate-700'}`}>Por Pagar (Salidas)</button>
                  </div>
                  <Button size="sm" onClick={() => setIsDebtModalOpen(true)} icon={<ICONS.Plus />}>Registrar</Button>
              </div>

              {filteredDebts.length === 0 ? <p className="text-center text-slate-500 py-10">No hay deudas registradas.</p> :
               filteredDebts.map(debt => {
                   const overdue = isOverdue(debt.due_date);
                   return (
                   <Card key={debt.id} className={`p-4 flex flex-col md:flex-row justify-between items-center border-l-4 ${debt.type === 'COBRAR' ? 'border-l-green-500' : 'border-l-red-500'} ${overdue ? 'bg-red-50 dark:bg-red-900/10' : ''}`}>
                       <div className="flex items-center gap-4 mb-2 md:mb-0 w-full md:w-auto">
                           <div className={`p-3 rounded-full shrink-0 ${debt.type === 'COBRAR' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                               <ICONS.ArrowRight />
                           </div>
                           <div>
                               <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                   {debt.client_name}
                                   {overdue && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] rounded-full uppercase font-bold">Vencido</span>}
                               </h4>
                               <p className="text-xs text-slate-500">
                                   {debt.platform ? `Vía: ${debt.platform}` : 'Sin plataforma'}
                                   {debt.due_date && ` • Vence: ${new Date(debt.due_date).toLocaleDateString()}`}
                               </p>
                           </div>
                       </div>
                       <div className="text-right w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end">
                           <p className={`text-lg font-bold ${debt.type === 'COBRAR' ? 'text-green-600' : 'text-red-600'}`}>
                               {debt.type === 'COBRAR' ? '+' : '-'}${debt.amount.toLocaleString()}
                           </p>
                           <span className={`text-xs px-2 py-0.5 rounded-full ${debt.status === 'PAGADO' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                               {debt.status}
                           </span>
                       </div>
                   </Card>
               )})
              }
          </div>
      );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-lg font-bold text-slate-800 dark:text-white">Tesorería</h2>
           <p className="text-sm text-slate-500">Control de cuentas bancarias y deudas.</p>
        </div>
        {activeTab === 'ACCOUNTS' && <Button onClick={() => setIsAccountModalOpen(true)} icon={<ICONS.Plus />}>Agregar Cuenta</Button>}
      </div>

      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700">
          <button onClick={() => setActiveTab('ACCOUNTS')} className={`pb-2 border-b-2 font-medium px-2 transition-colors ${activeTab === 'ACCOUNTS' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Mis Cuentas</button>
          <button onClick={() => setActiveTab('DEBTS')} className={`pb-2 border-b-2 font-medium px-2 transition-colors ${activeTab === 'DEBTS' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>Deudas</button>
      </div>

      {loading ? <p className="text-slate-500">Cargando...</p> : activeTab === 'ACCOUNTS' ? renderAccountsList() : renderDebtsList()}

      {/* Account Modal */}
      <Modal isOpen={isAccountModalOpen} onClose={() => setIsAccountModalOpen(false)} title="Agregar Cuenta">
         <div className="space-y-4">
            <FormField label="Nombre Banco"><Input value={bankName} onChange={e => setBankName(e.target.value)} placeholder="Ej. Banesco Panama" /></FormField>
            <FormField label="Titular"><Input value={holderName} onChange={e => setHolderName(e.target.value)} placeholder="Nombre del titular" /></FormField>
            <div className="grid grid-cols-2 gap-4">
                <FormField label="Número / Email"><Input value={accountNumber} onChange={e => setAccountNumber(e.target.value)} placeholder="XXXX-XXXX..." /></FormField>
                <FormField label="Moneda">
                    <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border rounded-md dark:border-slate-700 dark:text-white" value={currency} onChange={e => setCurrency(e.target.value)}>
                        <option>USD</option>
                        <option>EUR</option>
                        <option>VES</option>
                        <option>USDT</option>
                    </select>
                </FormField>
            </div>
            <FormField label="Tipo de Cuenta">
                 <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border rounded-md dark:border-slate-700 dark:text-white" value={type} onChange={e => setType(e.target.value)}>
                    <option value="BANCO">Banco Tradicional</option>
                    <option value="WALLET">Billetera Digital / Crypto</option>
                    <option value="EFECTIVO">Caja Fuerte / Efectivo</option>
                </select>
            </FormField>
            <FormField label="Saldo Inicial"><Input type="number" value={balance} onChange={e => setBalance(e.target.value)} placeholder="0.00" /></FormField>
            <div className="flex justify-end pt-4"><Button onClick={handleCreateAccount}>Guardar Cuenta</Button></div>
         </div>
      </Modal>

      {/* Debt Modal with Dates */}
      <Modal isOpen={isDebtModalOpen} onClose={() => setIsDebtModalOpen(false)} title={`Registrar Cuenta por ${debtType === 'COBRAR' ? 'Cobrar' : 'Pagar'}`}>
          <div className="space-y-4">
              <p className="text-sm text-slate-500">
                  {debtType === 'COBRAR' ? 'Registra un dinero que nos deben.' : 'Registra un compromiso de pago pendiente.'}
              </p>
              <FormField label={debtType === 'COBRAR' ? 'Deudor (Cliente)' : 'Acreedor (A quién debemos)'}>
                  <Input value={debtClient} onChange={e => setDebtClient(e.target.value)} placeholder="Nombre..." autoFocus />
              </FormField>
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Plataforma / Banco">
                    <Input value={debtPlatform} onChange={e => setDebtPlatform(e.target.value)} placeholder="Ej. Zelle" />
                </FormField>
                <FormField label="Fecha de Vencimiento">
                    <input
                        type="date"
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-sm text-slate-900 dark:text-white"
                        value={debtDueDate}
                        onChange={e => setDebtDueDate(e.target.value)}
                    />
                </FormField>
              </div>
              <FormField label="Monto (USD)">
                  <Input type="number" value={debtAmount} onChange={e => setDebtAmount(e.target.value)} placeholder="0.00" className="font-bold text-lg" />
              </FormField>
              <div className="flex justify-end pt-4 gap-2">
                  <Button variant="ghost" onClick={() => setIsDebtModalOpen(false)}>Cancelar</Button>
                  <Button onClick={handleCreateDebt}>Guardar Deuda</Button>
              </div>
          </div>
      </Modal>
    </div>
  );
};
