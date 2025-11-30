
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Card } from '../components/atoms/Card'
import { Button } from '../components/atoms/Button'
import { ICONS } from '../components/atoms/Icons'

export const ReportsView = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleExportCSV = async () => {
    let query = supabase.from('transactions').select('*').order('created_at', { ascending: false });

    // Aplicar filtros si existen
    if (startDate) query = query.gte('created_at', new Date(startDate).toISOString());
    if (endDate) query = query.lte('created_at', new Date(endDate).toISOString());

    const { data, error } = await query;

    if (error || !data || data.length === 0) return alert('No hay datos para exportar en este rango.');

    const csvRows = [];
    const headers = ['ID', 'Fecha', 'Tipo', 'Cliente', 'Monto (USD)', 'Tasa', 'Ganancia', 'Operador', 'Estado'];
    csvRows.push(headers.join(','));

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
          row.status
       ];
       csvRows.push(values.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Reporte_${startDate || 'Inicio'}_al_${endDate || 'Hoy'}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
       <div>
           <h2 className="text-lg font-bold text-slate-800 dark:text-white">Reportes & Datos</h2>
           <p className="text-sm text-slate-500">Exportación histórica filtrada.</p>
        </div>

        <Card className="p-8">
           <h3 className="font-bold text-slate-800 dark:text-white mb-4">Exportar Transacciones</h3>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                  <label className="text-xs font-bold text-slate-500">Desde</label>
                  <input type="date" className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div>
                  <label className="text-xs font-bold text-slate-500">Hasta</label>
                  <input type="date" className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
           </div>

           <div className="flex gap-4">
              <Button onClick={handleExportCSV} icon={<ICONS.Upload />}>Descargar CSV Filtrado</Button>
           </div>
        </Card>
    </div>
  );
};
