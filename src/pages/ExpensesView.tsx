import { useState } from "react";
// Supabase removed
import { Card } from "../components/atoms/Card";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
import { ICONS } from "../components/atoms/Icons";
import { Modal } from "../components/organisms/Modal";
import { FormField } from "../components/molecules/FormField";
import { Expense, ExpenseCategory } from "../types";

export const ExpensesView = () => {
  const [expenses] = useState<Expense[]>([
    {
      id: 1,
      description: "Gasto Mock 1",
      amount: 50,
      category: ExpenseCategory.OPERATIONAL,
      date: new Date().toISOString(),
    },
    {
      id: 2,
      description: "Gasto Mock 2",
      amount: 20,
      category: ExpenseCategory.LOGISTICS,
      date: new Date().toISOString(),
    },
  ]);
  const [activeTab, setActiveTab] = useState<ExpenseCategory>(
    ExpenseCategory.OPERATIONAL,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const handleSave = () => {
    if (!desc || !amount) return alert("Completa los datos");

    console.log("Mock Save Expense:", { desc, amount, activeTab });

    setIsModalOpen(false);
    setDesc("");
    setAmount("");
    // Simulate re-fetch
    // fetchExpenses();
  };

  const filtered = expenses.filter((e) => e.category === activeTab);
  const total = filtered.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Control de Gastos
          </h2>
          <p className="text-sm text-slate-500">
            Gestión de salidas operativas y logística.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          icon={<ICONS.Plus />}
          variant="danger"
        >
          Registrar Gasto
        </Button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab(ExpenseCategory.OPERATIONAL)}
          className={`border-b-2 px-4 py-2 text-sm font-medium ${activeTab === ExpenseCategory.OPERATIONAL ? "border-brand-600 text-brand-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Gastos Operativos
        </button>
        <button
          onClick={() => setActiveTab(ExpenseCategory.LOGISTICS)}
          className={`border-b-2 px-4 py-2 text-sm font-medium ${activeTab === ExpenseCategory.LOGISTICS ? "border-brand-600 text-brand-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
        >
          Consumos / Logística
        </button>
      </div>

      <Card className="border-red-100 bg-red-50 p-6 dark:border-red-900/30 dark:bg-red-900/10">
        <h3 className="text-sm font-bold tracking-wide text-red-800 uppercase dark:text-red-300">
          Total{" "}
          {activeTab === ExpenseCategory.OPERATIONAL
            ? "Operativo"
            : "Logística"}{" "}
          (Mes Actual)
        </h3>
        <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
          ${total.toLocaleString()}
        </p>
      </Card>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-slate-400">
            No hay registros en esta categoría.
          </p>
        ) : (
          filtered.map((exp) => (
            <Card
              key={exp.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="font-bold text-slate-800 dark:text-white">
                  {exp.description}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(exp.date).toLocaleDateString()}
                </p>
              </div>
              <span className="font-bold text-red-600">-${exp.amount} USD</span>
            </Card>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Registrar Gasto (${activeTab})`}
      >
        <div className="space-y-4">
          <FormField label="Descripción del Gasto">
            <Input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Ej. Pago de Internet, Almuerzo..."
            />
          </FormField>
          <FormField label="Monto (USD)">
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </FormField>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Guardar Salida
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
