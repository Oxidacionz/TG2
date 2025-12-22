import { useForm } from "react-hook-form";
import { TransactionType } from "@/types/enums";
import { Button } from "@core/ui/Button";
import { Input } from "@core/form/Input";
import { FormField } from "@core/form/FormField";
import { Modal } from "@core/overlay/Modal";

export interface DebtFormData {
  debtClient: string;
  debtPlatform: string;
  debtAmount: string;
  debtDueDate: string;
  type: TransactionType;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DebtFormData) => void;
  type: TransactionType;
}

export const DebtFormModal = (props: Props) => {
  const { isOpen, onClose, onSubmit, type } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DebtFormData>();

  const onFormSubmit = (data: DebtFormData) => {
    console.log("DebtFormModal Data:", data);
    onSubmit({ ...data, type });
    reset();
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
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
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
          error={errors.debtClient?.message}
        >
          <Input
            {...register("debtClient", { required: "El nombre es requerido" })}
            placeholder="Nombre..."
            autoFocus
          />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Plataforma / Banco">
            <Input {...register("debtPlatform")} placeholder="Ej. Zelle" />
          </FormField>
          <FormField label="Fecha de Vencimiento">
            <input
              type="date"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              {...register("debtDueDate")}
            />
          </FormField>
        </div>
        <FormField label="Monto (USD)" error={errors.debtAmount?.message}>
          <Input
            type="number"
            step="0.01"
            {...register("debtAmount", { required: "El monto es requerido" })}
            placeholder="0.00"
            className="text-lg font-bold"
          />
        </FormField>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button type="submit">Guardar Deuda</Button>
        </div>
      </form>
    </Modal>
  );
};
