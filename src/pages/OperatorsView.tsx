
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Card } from '../components/atoms/Card'
import { Operator } from '../../types';
import { ICONS } from '../components/atoms/Icons'
import { Button } from '../components/atoms/Button'
import { Toggle } from '../components/atoms/Toggle'
import { Modal } from '../components/organisms/Modal'

export const OperatorsView = () => {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    fetchOperators();
  }, []);

  const fetchOperators = async () => {
      setLoading(true);
      const { data } = await supabase.from('profiles').select('*');
      if (data) {
         // Filtramos para que NO se muestre el ADMIN ni el DEV
         const mappedOps: Operator[] = data
            .filter((p: any) => p.role !== 'ADMIN' && p.role !== 'DEV')
            .map((p: any) => ({
                id: p.id,
                username: p.username || 'Usuario',
                role: p.role || 'OPERADOR',
                last_active: p.updated_at,
                is_active: p.is_active ?? true // Fallback to true if null
            }));
         setOperators(mappedOps);
      }
      setLoading(false);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
      // Optimistic update
      setOperators(prev => prev.map(op => op.id === id ? { ...op, is_active: !currentStatus } : op));

      const { error } = await supabase.from('profiles').update({ is_active: !currentStatus }).eq('id', id);
      if (error) alert('Error actualizando estado');
  };

  const handleDisableAll = async () => {
      if(!confirm('¿Seguro que deseas deshabilitar a TODOS los camellos?')) return;

      const updates = operators.map(op => ({ id: op.id, is_active: false }));
      setOperators(prev => prev.map(op => ({ ...op, is_active: false })));

      // En batch es complejo con la API básica, hacemos loop simple por ahora
      for(const op of updates) {
          await supabase.from('profiles').update({ is_active: false }).eq('id', op.id);
      }
  };

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-end">
        <div>
           <h2 className="text-lg font-bold text-slate-800 dark:text-white">Operadores (Camellos)</h2>
           <p className="text-sm text-slate-500">Gestión de usuarios y permisos.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="danger" size="sm" onClick={handleDisableAll}>Deshabilitar Todos</Button>
            <Button onClick={() => setIsHelpOpen(true)} icon={<ICONS.Plus />}>Registrar Nuevo</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {loading ? <p>Cargando...</p> : operators.length === 0 ? <p className="text-slate-500">No hay operadores registrados.</p> :
         operators.map((op) => (
            <Card key={op.id} className={`p-6 flex flex-col items-center text-center relative border-2 ${op.is_active ? 'border-transparent' : 'border-slate-200 dark:border-slate-700 opacity-75'}`}>
               <div className={`absolute top-4 right-4`}>
                   <Toggle
                     checked={!!op.is_active}
                     onChange={() => handleToggleActive(op.id, !!op.is_active)}
                   />
               </div>

               <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-2xl font-bold text-slate-600 dark:text-slate-300 mb-4">
                  {op.username.charAt(0).toUpperCase()}
               </div>
               <h3 className="text-xl font-bold text-slate-800 dark:text-white">{op.username}</h3>
               <span className="px-3 py-1 rounded-full text-xs font-bold mt-2 bg-blue-100 text-blue-700">
                  {op.role}
               </span>
               <div className="mt-6 w-full border-t border-slate-100 dark:border-slate-700 pt-4 flex justify-between text-sm text-slate-500">
                  <span>ID: {op.id.substring(0,6)}...</span>
                  <span className={op.is_active ? "text-green-500" : "text-red-500"}>
                     {op.is_active ? '● Habilitado' : '○ Deshabilitado'}
                  </span>
               </div>
            </Card>
         ))}
      </div>

      <Modal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} title="Registro de Operador">
         <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <p>El registro se realiza en el panel de Supabase Auth.</p>
            <p className="text-sm">Al crear un usuario allí, aparecerá automáticamente en esta lista.</p>
            <Button className="w-full mt-2" onClick={() => setIsHelpOpen(false)}>Entendido</Button>
         </div>
      </Modal>
    </div>
  );
};
