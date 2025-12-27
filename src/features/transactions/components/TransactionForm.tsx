import { FormProvider } from "react-hook-form";

import { FileUploadZone } from "@core/form/FileUploadZone";
import { FormField } from "@core/form/FormField";
import { Input } from "@core/form/Input";
import { Button } from "@core/ui/Button";

import { TransactionType } from "@/types/enums";

import { PROFIT_PERCENTAGES, TRANSACTION_ACCOUNTS } from "../config/constants";
import { useTransactionForm } from "../hooks/useTransactionForm";
import { TransactionSummaryCard } from "./TransactionSummaryCard";
import { TransactionTypeSelector } from "./TransactionTypeSelector";

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
    watch,
    formState: { errors },
  } = methods;

  const { totalVES, calculatedProfit, amountUSD } = calculations;
  const { loading, previewImage, fileInputRef } = ui;
  const { type, service_fee_percent: profitPercent } = values;

  const contactId = watch("contact_id");
  const isNewContact = !contactId;

  return (
    <FormProvider {...methods}>
      <div className="flex h-full flex-col gap-6 md:flex-row">
        <div className="flex w-full flex-col gap-4 p-2 md:w-5/12">
          {/* --- LEFT COLUMN: SUMMARY & UPLOAD --- */}
          <TransactionSummaryCard
            type={type}
            amount={values.amount_native}
            rate={values.rate_internal}
            totalVES={totalVES}
            calculatedProfit={calculatedProfit}
            amountUSD={amountUSD}
          />

          <FileUploadZone
            previewImage={previewImage}
            fileInputRef={fileInputRef}
            onFileChange={actions.handleFileChange}
            onClick={actions.triggerFileInput}
          />
        </div>

        <div className="flex w-full flex-col gap-4 overflow-y-auto p-2 md:w-7/12">
          {/* --- RIGHT COLUMN: FORM FIELDS --- */}

          <TransactionTypeSelector
            type={type}
            onChange={(newType) => setValue("type", newType)}
          />

          <div className="flex flex-col gap-2">
            {/* Client Fields */}
            <section className="space-y-4">
              <FormField
                label="Buscar Cliente (Existente)"
                htmlFor="contact_id"
              >
                <select
                  id="contact_id"
                  className="focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  {...register("contact_id")}
                >
                  <option value="">-- Nuevo Contacto --</option>
                  {/* Populate dynamically later */}
                </select>
              </FormField>
              {isNewContact && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="Nombre del Cliente"
                    htmlFor="new_contact_name"
                  >
                    <Input
                      id="new_contact_name"
                      placeholder="Nombre Completo"
                      {...register("new_contact_name", {
                        required: isNewContact
                          ? "Nombre requerido para nuevo contacto"
                          : false,
                      })}
                    />
                    {errors.new_contact_name && (
                      <p className="text-xs text-rose-500">
                        {errors.new_contact_name.message}
                      </p>
                    )}
                  </FormField>
                  <FormField label="RIF/Cédula" htmlFor="new_contact_tax_id">
                    <Input
                      id="new_contact_tax_id"
                      placeholder="V-12345678"
                      {...register("new_contact_tax_id")}
                    />
                  </FormField>
                </div>
              )}
            </section>

            {/* Accounting Fields */}
            <section className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Monto Recibido"
                  error={errors.amount_native?.message}
                  htmlFor="amount_native"
                >
                  <Input
                    id="amount_native"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="font-mono text-lg font-bold"
                    {...register("amount_native", {
                      required: "Monto requerido",
                      min: { value: 0.01, message: "Mínimo 0.01" },
                    })}
                  />
                </FormField>
                <FormField label="Moneda" htmlFor="currency">
                  <select
                    id="currency"
                    className="focus:ring-brand-500 h-[42px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    {...register("currency", { required: true })}
                  >
                    <option value="USD">USD</option>
                    <option value="VES">VES</option>
                  </select>
                </FormField>
              </div>

              <FormField
                label="Tasa aplicada (VES/USD)"
                htmlFor="rate_internal"
              >
                <Input
                  id="rate_internal"
                  type="number"
                  step="0.01"
                  {...register("rate_internal")}
                />
              </FormField>

              <div className="space-y-1">
                <label
                  htmlFor="account_id"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Cuenta que{" "}
                  {type === TransactionType.INCOME ? "RECIBE" : "ENVÍA"} Dinero
                </label>
                <select
                  id="account_id"
                  className="focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  {...register("account_id", {
                    required: "Seleccione una cuenta",
                  })}
                >
                  <option value="">-- Seleccione Banco/Caja --</option>
                  {TRANSACTION_ACCOUNTS.map((account) => (
                    <option key={account.value} value={account.value}>
                      {account.label}
                    </option>
                  ))}
                </select>
                {errors.account_id && (
                  <p className="text-xs text-rose-500">
                    {errors.account_id.message}
                  </p>
                )}
              </div>
            </section>

            {/* Bank Commission (Gasto) */}
            <section>
              <FormField
                label="Comisión Bancaria (Gasto)"
                htmlFor="bank_commission_native"
              >
                <Input
                  id="bank_commission_native"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  {...register("bank_commission_native")}
                />
              </FormField>
            </section>

            {/* Validation Fields */}
            <section>
              <FormField label="Número Referencia">
                <Input placeholder="Ej. 12345678" {...register("reference")} />
              </FormField>
            </section>

            {/* Profit / Service Fee (Ganancia) */}
            <section>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Comisión por Servicio (Ganancia)
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
                      onClick={() => setValue("service_fee_percent", pct)}
                      className={`flex-1 rounded border py-1.5 text-xs ${profitPercent === pct ? "bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400" : "border-slate-200 text-slate-500 dark:border-slate-700"}`}
                    >
                      {pct}%
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setValue("service_fee_percent", "custom")}
                    className={`rounded border px-3 py-1.5 text-xs ${profitPercent === "custom" ? "bg-brand-50 border-brand-500 text-brand-700" : "border-slate-200 text-slate-500 dark:border-slate-700"}`}
                  >
                    Otro
                  </button>
                </div>
                {profitPercent === "custom" && (
                  <Input
                    id="custom_service_fee"
                    type="number"
                    placeholder="Ganancia manual en USD"
                    className="mt-2"
                    aria-label="Ganancia manual"
                    {...register("custom_service_fee")}
                  />
                )}
              </div>
            </section>

            {/* Notes Field */}
            <section>
              <FormField label="Notas Internas" htmlFor="internal_notes">
                <textarea
                  id="internal_notes"
                  rows={2}
                  className="focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  placeholder="Detalles opcionales..."
                  {...register("internal_notes")}
                />
              </FormField>
            </section>
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
