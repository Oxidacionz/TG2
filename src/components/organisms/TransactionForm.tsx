import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { FormField } from "../molecules/FormField";
import { FaCamera } from "react-icons/fa6";
import { TransactionType } from "../../types";
import { useTransactionController } from "../../hooks/useTransactionController";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
  userEmail?: string;
}

export const TransactionForm = (props: Props) => {
  const { onSuccess, onCancel, userEmail } = props;
  const { state, actions } = useTransactionController({ onSuccess, userEmail });
  const {
    type,
    amount,
    rate,
    profitPercent,
    customProfit,
    formData,
    previewImage,
    loading,
    fileInputRef,
    calculations: { totalVES, calculatedProfit },
  } = state;

  return (
    <div className="flex h-full flex-col gap-6 md:flex-row">
      {/* Panel Izquierdo: Visualización y Comprobante */}
      <div className="flex w-full flex-col gap-4 p-2 md:w-5/12">
        {/* Tarjeta de Resumen en Tiempo Real */}
        <div
          className={`rounded-2xl p-6 text-white shadow-lg ${type === TransactionType.INCOME ? "bg-linear-to-br from-green-600 to-teal-800" : "bg-linear-to-br from-red-600 to-rose-800"}`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded bg-black/20 px-2 py-1 text-[10px] font-bold tracking-wider uppercase">
              {type === TransactionType.INCOME ? "Recibimos" : "Enviamos"}
            </span>
            <span className="text-sm font-medium opacity-80">
              {type === TransactionType.INCOME
                ? "Cliente Paga"
                : "Cliente Recibe"}
            </span>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-4xl font-bold">${amount || "0.00"}</h2>
            <div className="text-right">
              <p className="text-xs uppercase opacity-70">Tasa</p>
              <p className="font-bold">{rate}</p>
            </div>
          </div>

          {/* Flow Visualizer */}
          <div className="my-3 flex items-center justify-between rounded-lg bg-black/10 p-3">
            <div className="text-center">
              <p className="text-xs opacity-70">
                {type === TransactionType.INCOME ? "USD" : "VES"}
              </p>
              <p className="text-sm font-bold">
                {type === TransactionType.INCOME
                  ? `$${amount || 0}`
                  : `Bs ${totalVES}`}
              </p>
            </div>
            <div className="text-white/50">➜</div>
            <div className="text-center">
              <p className="text-xs opacity-70">
                {type === TransactionType.INCOME ? "VES" : "USD"}
              </p>
              <p className="text-sm font-bold">
                {type === TransactionType.INCOME
                  ? `Bs ${totalVES}`
                  : `$${amount || 0}`}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-2">
            <span className="text-sm text-white/80">Ganancia Estimada</span>
            <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-900 shadow-sm">
              +${calculatedProfit.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Zona de Comprobante / Cámara */}
        <div
          className="group hover:border-brand-500 relative flex min-h-[200px] flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100 p-4 dark:border-slate-600 dark:bg-slate-800"
          onClick={actions.triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={actions.handleFileChange}
          />

          {previewImage ? (
            <>
              <img
                src={previewImage}
                alt="Comprobante"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <FaCamera className="h-6 w-6" />
                <p className="mt-2 font-medium text-white">Cambiar Imagen</p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-400 transition-transform group-hover:scale-110 dark:bg-slate-700">
                <FaCamera className="h-6 w-6" />
              </div>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                Subir Comprobante
              </p>
              <p className="mt-1 text-center text-xs text-slate-400">
                Arrastra o haz clic
              </p>
            </>
          )}
        </div>
      </div>

      {/* Panel Derecho: Inputs del Formulario */}
      <div className="flex w-full flex-col gap-4 overflow-y-auto p-2 md:w-7/12">
        {/* Selector de Tipo */}
        <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => actions.setType(TransactionType.INCOME)}
            className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-bold transition-all ${type === TransactionType.INCOME ? "bg-white text-green-600 shadow-sm dark:bg-slate-700" : "text-slate-500 hover:text-slate-700"}`}
          >
            <span className="text-lg">↘</span> COMPRA (Entrada)
          </button>
          <button
            onClick={() => actions.setType(TransactionType.EXPENSE)}
            className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-bold transition-all ${type === TransactionType.EXPENSE ? "bg-white text-red-600 shadow-sm dark:bg-slate-700" : "text-slate-500 hover:text-slate-700"}`}
          >
            <span className="text-lg">↗</span> VENTA (Salida)
          </button>
        </div>

        <div className="space-y-4">
          <FormField label="Cliente">
            <Input
              placeholder="Nombre del cliente..."
              value={formData.clientName}
              onChange={(e) =>
                actions.handleInputChange("clientName", e.target.value)
              }
              autoFocus
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Monto (USD)">
              <Input
                type="number"
                placeholder="0.00"
                className="font-mono text-lg font-bold"
                value={amount}
                onChange={(e) => actions.setAmount(e.target.value)}
              />
            </FormField>
            <FormField label="Tasa (VES)">
              <Input
                type="number"
                value={rate}
                onChange={(e) => actions.setRate(e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Comisión (VES)">
              <Input
                type="number"
                placeholder="0.00"
                value={formData.commission}
                onChange={(e) =>
                  actions.handleInputChange("commission", e.target.value)
                }
              />
            </FormField>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Cuenta {type === TransactionType.INCOME ? "RECIBE" : "ENVÍA"}{" "}
                Dinero
              </label>
              <select
                className="focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                value={formData.targetAccount}
                onChange={(e) =>
                  actions.handleInputChange("targetAccount", e.target.value)
                }
              >
                <option value="">Seleccionar cuenta...</option>
                <option value="Banesco Panama">Banesco Panamá</option>
                <option value="Binance">Binance (USDT)</option>
                <option value="Zelle">Zelle</option>
                <option value="Efectivo (Caja)">Efectivo (Caja Fuerte)</option>
                <option value="Banco Nacional">Banco Nacional (VES)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Banco Origen / Cliente">
              <Input
                placeholder="Ej. Banesco, Mercantil..."
                value={formData.clientBank}
                onChange={(e) =>
                  actions.handleInputChange("clientBank", e.target.value)
                }
              />
            </FormField>
            <FormField label="Número Referencia">
              <Input
                placeholder="Ej. 12345678"
                value={formData.reference}
                onChange={(e) =>
                  actions.handleInputChange("reference", e.target.value)
                }
              />
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
              {[1, 3, 5, 10].map((pct) => (
                <button
                  key={pct}
                  onClick={() => actions.setProfitPercent(pct)}
                  className={`flex-1 rounded border py-1.5 text-xs ${profitPercent === pct ? "bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400" : "border-slate-200 text-slate-500 dark:border-slate-700"}`}
                >
                  {pct}%
                </button>
              ))}
              <button
                onClick={() => actions.setProfitPercent("custom")}
                className={`rounded border px-3 py-1.5 text-xs ${profitPercent === "custom" ? "bg-brand-50 border-brand-500 text-brand-700" : "border-slate-200 text-slate-500 dark:border-slate-700"}`}
              >
                Otro
              </button>
            </div>
            {profitPercent === "custom" && (
              <Input
                type="number"
                placeholder="Ganancia manual en USD"
                value={customProfit}
                onChange={(e) => actions.setCustomProfit(e.target.value)}
                className="mt-2"
              />
            )}
          </div>

          <FormField label="Notas Adicionales">
            <textarea
              rows={2}
              className="focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="Detalles opcionales..."
              value={formData.notes}
              onChange={(e) =>
                actions.handleInputChange("notes", e.target.value)
              }
            />
          </FormField>
        </div>

        <div className="mt-auto flex gap-3 border-t border-slate-100 pt-4 dark:border-slate-700">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            className="flex-2"
            onClick={actions.handleSubmit}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Confirmar Transacción"}
          </Button>
        </div>
      </div>
    </div>
  );
};
