import FormField from "@/core/form/FormField";

interface SelectOption {
  label: string;
  value: string;
}

interface TransactionCategory {
  category: SelectOption;
  items: SelectOption[];
}

const TRANSACTION_TYPES: TransactionCategory[] = [
  {
    category: {
      label: "Tesorería",
      value: "treasury",
    },
    items: [
      { value: "currency-exchange", label: "Cambio de divisas" },
      { value: "internal-transfer", label: "Transferencia interna" },
    ],
  },
  {
    category: {
      label: "Ingresos",
      value: "income",
    },
    items: [
      { value: "sale", label: "Venta" },
      { value: "collection", label: "Cobro de deuda" },
      { value: "capital-injection", label: "Inyección de capital" },
    ],
  },
  {
    category: {
      label: "Egresos",
      value: "expenses",
    },
    items: [
      { value: "operating-expenses", label: "Gastos operativos" },
      { value: "vendor-payment", label: "Pago a proveedor" },
      { value: "payroll", label: "Nómina" },
      { value: "partner-withdrawal", label: "Retiro socio" },
    ],
  },
];

const TransactionTypeSelect = () => {
  return (
    <FormField className="w-full" label="Tipo de Operación">
      <select className="focus:ring-brand-500 h-9.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-shadow focus:border-transparent focus:ring-2 focus:outline-none focus:ring-inset dark:border-slate-700 dark:bg-slate-800 dark:text-white">
        <option value="" disabled>
          Seleccionar tipo de operación...
        </option>

        {TRANSACTION_TYPES.map((group) => (
          <optgroup key={group.category.value} label={group.category.label}>
            {group.items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </FormField>
  );
};

export default TransactionTypeSelect;
