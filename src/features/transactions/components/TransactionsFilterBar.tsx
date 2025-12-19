import { FaSearch } from "react-icons/fa";
import { Card } from "@core/layout/Card";
import { Input } from "@core/form/Input";

export const TransactionsFilterBar = () => {
  return (
    <Card className="flex flex-col gap-4 p-4 md:flex-row">
      <div className="relative flex-1">
        <div className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
          <FaSearch className="h-6 w-6" />
        </div>
        <Input
          placeholder="Buscar por cliente, referencia o nota..."
          className="pl-10"
        />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <select className="focus:ring-brand-500 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          <option>Todos los Tipos</option>
          <option>Entrada</option>
          <option>Salida</option>
        </select>
        <select className="focus:ring-brand-500 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
          <option>Todos los Estados</option>
          <option>Completado</option>
          <option>Pendiente</option>
        </select>
      </div>
    </Card>
  );
};
