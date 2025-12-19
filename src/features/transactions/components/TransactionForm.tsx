import { Button } from "@core/ui/Button";
import { Input } from "@core/form/Input";
import { FormField } from "@core/form/FormField";
import { TransactionType } from "@/types/enums";
import { useTransactionForm } from "../hooks/useTransactionForm";
import { FormProvider } from "react-hook-form";
import { TransactionSummaryCard } from "./TransactionSummaryCard";
import { FileUploadZone } from "@core/form/FileUploadZone";
import { TransactionTypeSelector } from "./TransactionTypeSelector";
import { TRANSACTION_ACCOUNTS, PROFIT_PERCENTAGES } from "../config/constants";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
  userEmail?: string;
}

export const TransactionForm = (props: Props) => {
  const { onSuccess, onCancel, userEmail } = props;
  const { methods, calculations, ui, actions, values } = useTransactionForm({
    onSuccess,
    userEmail,
  });

  const {
    register,
    setValue,
    formState: { errors },
  } = methods;

  const { totalVES, calculatedProfit } = calculations;
  const { loading, previewImage, fileInputRef } = ui;
  const { type, profitPercent } = values;

  return (
    <FormProvider {...methods}>
      <div className="flex h-full flex-col gap-6 md:flex-row">
        {/* Panel Izquierdo: Visualización y Comprobante */}
        <div className="flex w-full flex-col gap-4 p-2 md:w-5/12">
          <TransactionSummaryCard
            type={type}
            amount={values.amount}
            rate={values.rate}
            totalVES={totalVES}
            calculatedProfit={calculatedProfit}
          />

          <FileUploadZone
            previewImage={previewImage}
            fileInputRef={fileInputRef}
            onFileChange={actions.handleFileChange}
            onClick={actions.triggerFileInput}
          />
        </div>

        {/* Panel Derecho: Inputs del Formulario */}
        <div className="flex w-full flex-col gap-4 overflow-y-auto p-2 md:w-7/12">
          <TransactionTypeSelector
            type={type}
            onChange={(newType) => setValue("type", newType)}
          />

          <div className="space-y-4">
            <FormField label="Cliente" error={errors.clientName?.message}>
              <Input
                placeholder="Nombre del cliente..."
                {...register("clientName", {
                  required: "El nombre del cliente es requerido",
                })}
                autoFocus
              />
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Monto (USD)" error={errors.amount?.message}>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="font-mono text-lg font-bold"
                  {...register("amount", {
                    required: "Monto requerido",
                    min: { value: 0.01, message: "Mínimo 0.01" },
                  })}
                />
              </FormField>
              <FormField label="Tasa (VES)">
                <Input type="number" step="0.01" {...register("rate")} />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Comisión (VES)">
                <Input
                  type="number"
                  placeholder="0.00"
                  {...register("commission")}
                />
              </FormField>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Cuenta {type === TransactionType.INCOME ? "RECIBE" : "ENVÍA"}{" "}
                  Dinero
                </label>
                <select
                  className="focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  {...register("targetAccount", {
                    required: "Seleccione una cuenta",
                  })}
                >
                  <option value="">Seleccionar cuenta...</option>
                  {TRANSACTION_ACCOUNTS.map((account) => (
                    <option key={account.value} value={account.value}>
                      {account.label}
                    </option>
                  ))}
                </select>
                {errors.targetAccount && (
                  <p className="text-xs text-rose-500">
                    {errors.targetAccount.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Banco Origen / Cliente">
                <Input
                  placeholder="Ej. Banesco, Mercantil..."
                  {...register("clientBank")}
                />
              </FormField>
              <FormField label="Número Referencia">
                <Input placeholder="Ej. 12345678" {...register("reference")} />
              </FormField>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Comisión por transacción
                </label>
                <span className="text-brand-600 text-xs font-medium">
                  Calculado: ${calculatedProfit.toFixed(2)}
                </span>
              </div>
              <div className="flex gap-2">
                {PROFIT_PERCENTAGES.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setValue("profitPercent", pct)}
                    className={`flex-1 rounded border py-1.5 text-xs ${profitPercent === pct ? "bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400" : "border-slate-200 text-slate-500 dark:border-slate-700"}`}
                  >
                    {pct}%
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setValue("profitPercent", "custom")}
                  className={`rounded border px-3 py-1.5 text-xs ${profitPercent === "custom" ? "bg-brand-50 border-brand-500 text-brand-700" : "border-slate-200 text-slate-500 dark:border-slate-700"}`}
                >
                  Otro
                </button>
              </div>
              {profitPercent === "custom" && (
                <Input
                  type="number"
                  placeholder="Ganancia manual en USD"
                  className="mt-2"
                  {...register("customProfit")}
                />
              )}
            </div>

            <FormField label="Notas Adicionales">
              <textarea
                rows={2}
                className="focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="Detalles opcionales..."
                {...register("notes")}
              />
            </FormField>
          </div>

          <div className="mt-auto flex gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
            <Button
              variant="ghost"
              className="flex-1"
              onClick={onCancel}
              disabled={loading}
              type="button"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              className="flex-2"
              onClick={actions.submit}
              disabled={loading}
              type="submit"
            >
              {loading ? "Guardando..." : "Confirmar Transacción"}
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
