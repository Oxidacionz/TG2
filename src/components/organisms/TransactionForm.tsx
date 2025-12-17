import React, { useState, useRef } from "react";
// Supabase removed
import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { FormField } from "../molecules/FormField";
import { FaCamera } from "react-icons/fa6";

interface TransactionFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  userEmail?: string;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSuccess,
  onCancel,
  userEmail: _userEmail,
}) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados del formulario (Datos Principales)
  const [type, setType] = useState<"ENTRADA" | "SALIDA">("ENTRADA");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("36.00");
  const [profitPercent, setProfitPercent] = useState<number | "custom">(5);
  const [customProfit, setCustomProfit] = useState("");

  // Datos Operativos (Conectados a inputs)
  const [clientName, setClientName] = useState("");
  const [clientBank, setClientBank] = useState(""); // Banco Origen
  const [targetAccount, setTargetAccount] = useState(""); // Cuenta Interna
  const [commission, setCommission] = useState(""); // Comisión en VES
  const [reference, setReference] = useState(""); // Número de referencia
  const [notes, setNotes] = useState("");

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Cálculos automáticos
  const amountNum = parseFloat(amount) || 0;
  const rateNum = parseFloat(rate) || 0;

  // Total en Bolívares
  const totalVES = (amountNum * rateNum).toFixed(2);

  // Ganancia Estimada
  const calculatedProfit =
    profitPercent === "custom"
      ? parseFloat(customProfit) || 0
      : amountNum * (profitPercent / 100);

  // Manejo de Archivos (Simulación visual de carga)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    // Validaciones básicas
    if (!clientName) {
      alert("Por favor ingrese el nombre del cliente.");
      return;
    }
    if (!amount || amountNum <= 0) {
      alert("Por favor ingrese un monto válido.");
      return;
    }
    if (!targetAccount) {
      alert("Por favor seleccione la cuenta interna.");
      return;
    }

    setLoading(true);
    try {
      console.log("Mock Transaction Submitted:", {
        type,
        clientName,
        amount,
        rate,
        profit: calculatedProfit,
        targetAccount,
        commission,
        notes,
      });

      onSuccess();
      setLoading(false);
    } catch (error: any) {
      console.error("Error creating transaction:", error);
      alert("Error al guardar: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col gap-6 md:flex-row">
      {/* Panel Izquierdo: Visualización y Comprobante */}
      <div className="flex w-full flex-col gap-4 p-2 md:w-5/12">
        {/* Tarjeta de Resumen en Tiempo Real */}
        <div
          className={`rounded-2xl p-6 text-white shadow-lg ${type === "ENTRADA" ? "bg-gradient-to-br from-green-600 to-teal-800" : "bg-gradient-to-br from-red-600 to-rose-800"}`}
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded bg-black/20 px-2 py-1 text-[10px] font-bold tracking-wider uppercase">
              {type === "ENTRADA" ? "Recibimos" : "Enviamos"}
            </span>
            <span className="text-sm font-medium opacity-80">
              {type === "ENTRADA" ? "Cliente Paga" : "Cliente Recibe"}
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
                {type === "ENTRADA" ? "USD" : "VES"}
              </p>
              <p className="text-sm font-bold">
                {type === "ENTRADA" ? `$${amount || 0}` : `Bs ${totalVES}`}
              </p>
            </div>
            <div className="text-white/50">➜</div>
            <div className="text-center">
              <p className="text-xs opacity-70">
                {type === "ENTRADA" ? "VES" : "USD"}
              </p>
              <p className="text-sm font-bold">
                {type === "ENTRADA" ? `Bs ${totalVES}` : `$${amount || 0}`}
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
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
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
            onClick={() => setType("ENTRADA")}
            className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-bold transition-all ${type === "ENTRADA" ? "bg-white text-green-600 shadow-sm dark:bg-slate-700" : "text-slate-500 hover:text-slate-700"}`}
          >
            <span className="text-lg">↘</span> COMPRA (Entrada)
          </button>
          <button
            onClick={() => setType("SALIDA")}
            className={`flex items-center justify-center gap-2 rounded-md py-2 text-sm font-bold transition-all ${type === "SALIDA" ? "bg-white text-red-600 shadow-sm dark:bg-slate-700" : "text-slate-500 hover:text-slate-700"}`}
          >
            <span className="text-lg">↗</span> VENTA (Salida)
          </button>
        </div>

        <div className="space-y-4">
          <FormField label="Cliente">
            <Input
              placeholder="Nombre del cliente..."
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
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
                onChange={(e) => setAmount(e.target.value)}
              />
            </FormField>
            <FormField label="Tasa (VES)">
              <Input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Comisión (VES)">
              <Input
                type="number"
                placeholder="0.00"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
              />
            </FormField>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Cuenta {type === "ENTRADA" ? "RECIBE" : "ENVÍA"} Dinero
              </label>
              <select
                className="focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                value={targetAccount}
                onChange={(e) => setTargetAccount(e.target.value)}
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
                value={clientBank}
                onChange={(e) => setClientBank(e.target.value)}
              />
            </FormField>
            <FormField label="Número Referencia">
              <Input
                placeholder="Ej. 12345678"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
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
                  onClick={() => setProfitPercent(pct)}
                  className={`flex-1 rounded border py-1.5 text-xs ${profitPercent === pct ? "bg-brand-50 border-brand-500 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400" : "border-slate-200 text-slate-500 dark:border-slate-700"}`}
                >
                  {pct}%
                </button>
              ))}
              <button
                onClick={() => setProfitPercent("custom")}
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
                onChange={(e) => setCustomProfit(e.target.value)}
                className="mt-2"
              />
            )}
          </div>

          <FormField label="Notas Adicionales">
            <textarea
              rows={2}
              className="focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="Detalles opcionales..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Confirmar Transacción"}
          </Button>
        </div>
      </div>
    </div>
  );
};
