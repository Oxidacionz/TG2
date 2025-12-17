import { useState } from "react";
import { TransactionType } from "../../types";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { FormField } from "../molecules/FormField";
import { Modal } from "./Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  type: TransactionType;
}

export const DebtFormModal = (props: Props) => {
  const { isOpen, onClose, onSubmit, type } = props;

  const [debtClient, setDebtClient] = useState("");
  const [debtPlatform, setDebtPlatform] = useState("");
  const [debtAmount, setDebtAmount] = useState("");
  const [debtDueDate, setDebtDueDate] = useState("");

  const handleSubmit = () => {
    if (!debtClient || !debtAmount) return alert("Datos obligatorios");
    onSubmit({
      debtClient,
      debtPlatform,
      debtAmount,
      debtDueDate,
      type,
    });
    // Reset form logic would go here ideally
    setDebtClient("");
    setDebtPlatform("");
    setDebtAmount("");
    setDebtDueDate("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Registrar Cuenta por ${
        type === TransactionType.INCOME ? "Cobrar" : "Pagar"
      }`}
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-500">
          {type === TransactionType.INCOME
            ? "Registra un dinero que nos deben."
            : "Registra un compromiso de pago pendiente."}
        </p>
        <FormField
          label={
            type === TransactionType.INCOME
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
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Guardar Deuda</Button>
        </div>
      </div>
    </Modal>
  );
};
