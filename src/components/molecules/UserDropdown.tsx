
import React, { useState, useEffect } from 'react';
import { ICONS } from '../atoms/Icons';
import { supabase } from '../../lib/supabaseClient';

export const UserDropdown: React.FC<{ onLogout?: () => void, userEmail?: string, onSettings?: () => void }> = ({ onLogout, userEmail, onSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState('Cargando...');

  // Extraer nombre del email si no hay nombre de usuario (ej. admin@... -> admin)
  const displayName = userEmail ? userEmail.split('@')[0] : 'ToroUser';

  useEffect(() => {
    // Obtener rol real de Supabase
    const fetchRole = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
            if (data) setRole(data.role);
        }
    };
    fetchRole();
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-sm hover:bg-brand-700 transition-colors">
        {displayName.charAt(0).toUpperCase()}
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 z-20 py-1 animate-fade-in-down">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{displayName}</p>
              <p className={`text-xs font-bold ${role === 'ADMIN' ? 'text-purple-500' : 'text-brand-500'}`}>{role}</p>
              <p className="text-xs text-slate-500 truncate">{userEmail}</p>
            </div>
            <button
                onClick={() => {
                    setIsOpen(false);
                    if(onSettings) onSettings();
                }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2"
            >
              <ICONS.Users /> Configuración
            </button>
            <div className="border-t border-slate-200 dark:border-slate-700 mt-1"></div>
            <button
                onClick={() => {
                    if(onLogout) onLogout();
                    setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
            >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
               Cerrar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
};
