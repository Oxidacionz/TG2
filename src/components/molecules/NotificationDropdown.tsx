
import React, { useState } from 'react';
import { ICONS } from '../atoms/Icons';

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Aquí podrías conectar con Supabase para traer notificaciones reales de la tabla 'notes'
  const notifications: any[] = []; 

  return (
    <div className="relative">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors relative"
       >
          <ICONS.Bell />
          {notifications.length > 0 && (
             <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          )}
       </button>

       {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-20 py-2 animate-fade-in-down overflow-hidden">
             <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-sm text-slate-800 dark:text-white">Notificaciones</h3>
             </div>
             
             <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="px-4 py-6 text-center text-slate-500 text-sm">
                        <p>No hay notificaciones en este momento.</p>
                    </div>
                ) : (
                    notifications.map((note, idx) => (
                        <div key={idx} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700 last:border-0">
                            <p className="text-sm text-slate-800 dark:text-white">{note.content}</p>
                            <p className="text-xs text-slate-400 mt-1">Hace un momento</p>
                        </div>
                    ))
                )}
             </div>
          </div>
        </>
       )}
    </div>
  );
};
