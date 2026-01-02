import { ChangeEvent, useRef, useState } from "react";
import { BiPlus } from "react-icons/bi";

import FileUploadZone from "@core/form/FileUploadZone";
import FormField from "@core/form/FormField";
import Input from "@core/form/Input";

import HybridSelect from "@/core/form/HybridSelect";

import CurrencySelect from "./CurrencySelect";
import TransactionTypeSelect from "./TransactionTypeSelect";

type PreviewImage = string | null;

interface Props {
  onClose: () => void;
}

const TransactionForm = (props: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<PreviewImage>(null);
  const [rate, setRate] = useState<string | number>("36.50"); // temporal

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  return (
    <div className="grid h-full min-h-[50vh] grid-cols-1 gap-6 md:grid-cols-4 lg:gap-8 xl:gap-10">
      <div className="hidden flex-col md:col-span-1 md:flex">
        <FileUploadZone
          previewImage={previewImage}
          fileInputRef={fileInputRef}
          onFileChange={handleFileChange}
          onClick={handleClick}
        />
      </div>

      <form
        className="grid w-full grid-cols-1 gap-4 md:col-span-3 lg:gap-6"
        action=""
      >
        <div className="grid grid-cols-[1fr_auto] items-end gap-2 lg:gap-4">
          <TransactionTypeSelect />
          <span className="flex h-9.5 items-center justify-center rounded bg-slate-100 px-4 text-xs font-bold text-slate-500 dark:bg-slate-800">
            NEUTRO
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-end gap-2 lg:gap-4">
          <div className="w-full">
            <FormField label="Cliente">
              <Input type="text" />
            </FormField>
          </div>
          <button
            type="button"
            className="h-9.5 rounded bg-slate-200 px-3 py-2 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
          >
            <BiPlus />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:gap-4">
          <FormField label="Monto">
            <Input type="number" placeholder="00.00" />
          </FormField>

          <FormField label="Tasa de cambio">
            <HybridSelect
              placeholder="00.00"
              options={[
                { label: "BCV - USD", value: "36.50" },
                { label: "Binance - USDT", value: "36.50" },
                { label: "Binance - BTC", value: "36.50" },
                { label: "Paralelo - USD", value: "44.10" },
              ]}
              value={rate}
              onChange={setRate}
              inputType="number"
              customOptionLabel="+ Tasa Personalizada"
            />
          </FormField>

          <div className="sm:col-span-2 md:col-span-1">
            <CurrencySelect />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:gap-4">
          <FormField label="Comisión del banco">
            <Input type="text" placeholder="00.00%" />
          </FormField>
          <FormField label="Destino">
            <Input type="text" />
          </FormField>
          <div className="sm:col-span-2 md:col-span-1">
            <FormField label="Referencia">
              <Input type="text" />
            </FormField>
          </div>
        </div>

        <div>
          <FormField label="Notas (Opcional)">
            <Input type="text" placeholder="Escribe una nota..." />
          </FormField>
        </div>

        <div className="mt-2 flex flex-row justify-center gap-2 md:justify-end lg:mt-4 lg:gap-4">
          <input
            type="button"
            value="Cancelar"
            onClick={props.onClose}
            className="cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-white hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600"
          />
          <input
            type="submit"
            value="Guardar"
            onClick={props.onClose}
            /* cerrar solo cuando se subio a la nube */
            className="bg-brand-500 cursor-pointer rounded-lg px-4 py-2 text-white hover:opacity-90"
          />
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
