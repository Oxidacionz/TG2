import { useState } from "react";
import { AccountType, Currency } from "../../types";
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { FormField } from "../molecules/FormField";
import { Modal } from "./Modal";

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

  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [currency, setCurrency] = useState<Currency>(Currency.USD);
  const [balance, setBalance] = useState("");
  const [type, setType] = useState<AccountType>(AccountType.BANCO);

  const handleSubmit = () => {
    if (!bankName || !holderName) return alert("Datos obligatorios");
    onSubmit({
      bankName,
      holderName,
      accountNumber,
      currency,
      balance,
      type,
    });
    // Reset form or handle in parent
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar Cuenta">
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
              onChange={(e) => setCurrency(e.target.value as Currency)}
            >
              <option value={Currency.USD}>USD</option>
              {/* <option value="EUR">EUR</option> */}
              <option value={Currency.VES}>VES</option>
              <option value={Currency.USDT}>USDT</option>
            </select>
          </FormField>
        </div>
        <FormField label="Tipo de Cuenta">
          <select
            className="w-full rounded-md border bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            value={type}
            onChange={(e) => setType(e.target.value as AccountType)}
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
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            placeholder="0.00"
          />
        </FormField>
        <div className="flex justify-end pt-4">
          <Button onClick={handleSubmit}>Guardar Cuenta</Button>
        </div>
      </div>
    </Modal>
  );
};
