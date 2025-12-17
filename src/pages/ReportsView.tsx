import { useState } from "react";
// Supabase removed
import { Card } from "../components/atoms/Card";
import { Button } from "../components/atoms/Button";
import { ICONS } from "../components/atoms/Icons";

export const ReportsView = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleExportCSV = async () => {
    // Mock Export
    const data = [
      {
        id: 1,
        created_at: new Date().toISOString(),
        type: "ENTRADA",
        client_name: "Mock Client",
        amount: 100,
        rate: 36,
        profit: 5,
        operator_name: "Admin Mock",
        status: "COMPLETADO",
      },
    ];

    const csvRows = [];
    const headers = [
      "ID",
      "Fecha",
      "Tipo",
      "Cliente",
      "Monto (USD)",
      "Tasa",
      "Ganancia",
      "Operador",
      "Estado",
    ];
    csvRows.push(headers.join(","));

    data.forEach((row: any) => {
      const values = [
        row.id,
        new Date(row.created_at).toLocaleDateString(),
        row.type,
        `"${row.client_name}"`,
        row.amount,
        row.rate,
        row.profit,
        row.operator_name,
        row.status,
      ];
      csvRows.push(values.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Reporte_${startDate || "Inicio"}_al_${endDate || "Hoy"}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">
          Reportes & Datos
        </h2>
        <p className="text-sm text-slate-500">
          Exportación histórica filtrada.
        </p>
      </div>

      <Card className="p-8">
        <h3 className="mb-4 font-bold text-slate-800 dark:text-white">
          Exportar Transacciones
        </h3>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs font-bold text-slate-500">Desde</label>
            <input
              type="date"
              className="w-full rounded border p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500">Hasta</label>
            <input
              type="date"
              className="w-full rounded border p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={handleExportCSV} icon={<ICONS.Upload />}>
            Descargar CSV Filtrado
          </Button>
        </div>
      </Card>
    </div>
  );
};
