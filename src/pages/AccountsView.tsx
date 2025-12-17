import React, { useState } from "react";
// Supabase removed
import { Card } from "../components/atoms/Card";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
import { ICONS } from "../components/atoms/Icons";
import { Modal } from "../components/organisms/Modal";
import { FormField } from "../components/molecules/FormField";

export const AccountsView = () => {
  const [activeTab, setActiveTab] = useState<"ACCOUNTS" | "DEBTS">("ACCOUNTS");
  const [debtType, setDebtType] = useState<"COBRAR" | "PAGAR">("COBRAR");

  // Data State
  const [accounts] = useState([
    {
      id: 1,
      bank_name: "Mock Bank",
      holder_name: "Mock Holder",
      balance: 1000,
      currency: "USD",
      type: "BANCO",
    },
  ] as any);
  const [debts] = useState([
    {
      id: 1,
      type: "COBRAR",
      client_name: "Mock Client",
      amount: 500,
      status: "PENDIENTE",
      due_date: new Date().toISOString(),
    },
  ] as any);
  const [loading] = useState<boolean>(false);

  // Modals
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);

  // Form State (Accounts)
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [balance, setBalance] = useState("");
  const [type, setType] = useState("BANCO");

  // Form State (Debts)
  const [debtClient, setDebtClient] = useState("");
  const [debtPlatform, setDebtPlatform] = useState("");
  const [debtAmount, setDebtAmount] = useState("");
  const [debtDueDate, setDebtDueDate] = useState("");

  const handleCreateAccount = () => {
    if (!bankName || !holderName) return alert("Datos obligatorios");
    console.log("Mock Create Account:", { bankName, holderName, balance });
    setIsAccountModalOpen(false);
    // fetchAll();
  };

  const handleCreateDebt = () => {
    if (!debtClient || !debtAmount) return alert("Datos obligatorios");
    console.log("Mock Create Debt:", { debtClient, debtAmount });
    setIsDebtModalOpen(false);
    setDebtClient("");
    setDebtPlatform("");
    setDebtAmount("");
    setDebtDueDate("");
    // fetchAll();
  };

  const isOverdue = (dateString?: string) => {
    if (!dateString) return false;
    return (
      new Date(dateString) < new Date() &&
      new Date(dateString).toDateString() !== new Date().toDateString()
    );
  };

  const renderAccountsList = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map((acc) => (
        <Card
          key={acc.id}
          className="group relative overflow-hidden p-6 transition-all hover:shadow-lg"
        >
          <div className="absolute top-0 right-0 rounded-bl-lg bg-slate-100 p-2 text-xs font-bold text-slate-500 dark:bg-slate-700">
            {acc.currency}
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white shadow-lg ${acc.type === "WALLET" ? "bg-yellow-500" : acc.type === "EFECTIVO" ? "bg-green-500" : "bg-blue-600"}`}
            >
              {acc.type === "WALLET"
                ? "₿"
                : acc.type === "EFECTIVO"
                  ? "$"
                  : "🏛"}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">
                {acc.bank_name}
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
            <p className="truncate text-xs text-slate-500">{acc.holder_name}</p>
          </div>
        </Card>
      ))}
      {accounts.length === 0 && (
        <p className="col-span-3 text-center text-slate-500">
          No hay cuentas registradas.
        </p>
      )}
    </div>
  );

  const renderDebtsList = () => {
    const filteredDebts = debts.filter((d) => d.type === debtType);
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
          <div className="flex gap-2">
            <button
              onClick={() => setDebtType("COBRAR")}
              className={`rounded-md px-4 py-2 text-sm font-bold transition-all ${debtType === "COBRAR" ? "bg-white text-green-700 shadow" : "text-slate-500 hover:text-slate-700"}`}
            >
              Por Cobrar (Entradas)
            </button>
            <button
              onClick={() => setDebtType("PAGAR")}
              className={`rounded-md px-4 py-2 text-sm font-bold transition-all ${debtType === "PAGAR" ? "bg-white text-red-700 shadow" : "text-slate-500 hover:text-slate-700"}`}
            >
              Por Pagar (Salidas)
            </button>
          </div>
          <Button
            size="sm"
            onClick={() => setIsDebtModalOpen(true)}
            icon={<ICONS.Plus />}
          >
            Registrar
          </Button>
        </div>

        {filteredDebts.length === 0 ? (
          <p className="py-10 text-center text-slate-500">
            No hay deudas registradas.
          </p>
        ) : (
          filteredDebts.map((debt) => {
            const overdue = isOverdue(debt.due_date);
            return (
              <Card
                key={debt.id}
                className={`flex flex-col items-center justify-between border-l-4 p-4 md:flex-row ${debt.type === "COBRAR" ? "border-l-green-500" : "border-l-red-500"} ${overdue ? "bg-red-50 dark:bg-red-900/10" : ""}`}
              >
                <div className="mb-2 flex w-full items-center gap-4 md:mb-0 md:w-auto">
                  <div
                    className={`shrink-0 rounded-full p-3 ${debt.type === "COBRAR" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                  >
                    <ICONS.ArrowRight />
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
                      {debt.platform
                        ? `Vía: ${debt.platform}`
                        : "Sin plataforma"}
                      {debt.due_date &&
                        ` • Vence: ${new Date(debt.due_date).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <div className="flex w-full flex-row items-center justify-between text-right md:w-auto md:flex-col md:items-end">
                  <p
                    className={`text-lg font-bold ${debt.type === "COBRAR" ? "text-green-600" : "text-red-600"}`}
                  >
                    {debt.type === "COBRAR" ? "+" : "-"}$
                    {debt.amount.toLocaleString()}
                  </p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${debt.status === "PAGADO" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {debt.status}
                  </span>
                </div>
              </Card>
            );
          })
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Tesorería
          </h2>
          <p className="text-sm text-slate-500">
            Control de cuentas bancarias y deudas.
          </p>
        </div>
        {activeTab === "ACCOUNTS" && (
          <Button
            onClick={() => setIsAccountModalOpen(true)}
            icon={<ICONS.Plus />}
          >
            Agregar Cuenta
          </Button>
        )}
      </div>

      <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab("ACCOUNTS")}
          className={`border-b-2 px-2 pb-2 font-medium ${activeTab === "ACCOUNTS" ? "border-brand-600 text-brand-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Mis Cuentas
        </button>
        <button
          onClick={() => setActiveTab("DEBTS")}
          className={`border-b-2 px-2 pb-2 font-medium ${activeTab === "DEBTS" ? "border-brand-600 text-brand-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Deudas
        </button>
      </div>

      {loading ? (
        <p className="text-slate-500">Cargando...</p>
      ) : activeTab === "ACCOUNTS" ? (
        renderAccountsList()
      ) : (
        renderDebtsList()
      )}

      {/* Account Modal */}
      <Modal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        title="Agregar Cuenta"
      >
        <div className="space-y-4">
          <FormField label="Nombre Banco">
            <Input
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Ej. Banesco Panama"
            />
          </FormField>
          <FormField label="Titular">
            <Input
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="Nombre del titular"
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Número / Email">
              <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="XXXX-XXXX..."
              />
            </FormField>
            <FormField label="Moneda">
              <select
                className="w-full rounded-md border bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option>USD</option>
                <option>EUR</option>
                <option>VES</option>
                <option>USDT</option>
              </select>
            </FormField>
          </div>
          <FormField label="Tipo de Cuenta">
            <select
              className="w-full rounded-md border bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="BANCO">Banco Tradicional</option>
              <option value="WALLET">Billetera Digital / Crypto</option>
              <option value="EFECTIVO">Caja Fuerte / Efectivo</option>
            </select>
          </FormField>
          <FormField label="Saldo Inicial">
            <Input
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="0.00"
            />
          </FormField>
          <div className="flex justify-end pt-4">
            <Button onClick={handleCreateAccount}>Guardar Cuenta</Button>
          </div>
        </div>
      </Modal>

      {/* Debt Modal with Dates */}
      <Modal
        isOpen={isDebtModalOpen}
        onClose={() => setIsDebtModalOpen(false)}
        title={`Registrar Cuenta por ${debtType === "COBRAR" ? "Cobrar" : "Pagar"}`}
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            {debtType === "COBRAR"
              ? "Registra un dinero que nos deben."
              : "Registra un compromiso de pago pendiente."}
          </p>
          <FormField
            label={
              debtType === "COBRAR"
                ? "Deudor (Cliente)"
                : "Acreedor (A quién debemos)"
            }
          >
            <Input
              value={debtClient}
              onChange={(e) => setDebtClient(e.target.value)}
              placeholder="Nombre..."
              autoFocus
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Plataforma / Banco">
              <Input
                value={debtPlatform}
                onChange={(e) => setDebtPlatform(e.target.value)}
                placeholder="Ej. Zelle"
              />
            </FormField>
            <FormField label="Fecha de Vencimiento">
              <input
                type="date"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                value={debtDueDate}
                onChange={(e) => setDebtDueDate(e.target.value)}
              />
            </FormField>
          </div>
          <FormField label="Monto (USD)">
            <Input
              type="number"
              value={debtAmount}
              onChange={(e) => setDebtAmount(e.target.value)}
              placeholder="0.00"
              className="text-lg font-bold"
            />
          </FormField>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={() => setIsDebtModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateDebt}>Guardar Deuda</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
