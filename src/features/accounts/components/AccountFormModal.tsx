import { useForm } from "react-hook-form";
import { AccountType, Currency } from "@/types/enums";
import { Button } from "@core/ui/Button";
import { Input } from "@core/form/Input";
import { FormField } from "@core/form/FormField";
import { Modal } from "@core/overlay/Modal";

export interface AccountFormData {
  bankName: string;
  holderName: string;
  accountNumber: string;
  currency: Currency;
  balance: string;
  type: AccountType;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AccountFormData) => void;
}

export const AccountFormModal = (props: Props) => {
  const { isOpen, onClose, onSubmit } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AccountFormData>({
    defaultValues: {
      currency: Currency.USD,
      type: AccountType.BANCO,
    },
  });

  const onFormSubmit = (data: AccountFormData) => {
    // Reset form logic would go here ideally
    console.log("AccountFormModal Data:", data);
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar Cuenta">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <FormField label="Nombre Banco" error={errors.bankName?.message}>
          <Input
            {...register("bankName", { required: "El nombre es requerido" })}
            placeholder="Ej. Banesco Panama"
          />
        </FormField>
        <FormField label="Titular" error={errors.holderName?.message}>
          <Input
            {...register("holderName", { required: "El titular es requerido" })}
            placeholder="Nombre del titular"
          />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Número / Email">
            <Input {...register("accountNumber")} placeholder="XXXX-XXXX..." />
          </FormField>
          <FormField label="Moneda">
            <select
              className="w-full rounded-md border bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              {...register("currency")}
            >
              <option value={Currency.USD}>USD</option>
              <option value={Currency.VES}>VES</option>
              <option value={Currency.USDT}>USDT</option>
            </select>
          </FormField>
        </div>
        <FormField label="Tipo de Cuenta">
          <select
            className="w-full rounded-md border bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            {...register("type")}
          >
            <option value={AccountType.BANCO}>Banco Tradicional</option>
            <option value={AccountType.WALLET}>
              Billetera Digital / Crypto
            </option>
            <option value={AccountType.EFECTIVO}>Caja Fuerte / Efectivo</option>
          </select>
        </FormField>
        <FormField label="Saldo Inicial">
          <Input
            type="number"
            step="0.01"
            {...register("balance")}
            placeholder="0.00"
          />
        </FormField>
        <div className="flex justify-end pt-4">
          <Button type="submit">Guardar Cuenta</Button>
        </div>
      </form>
    </Modal>
  );
};
