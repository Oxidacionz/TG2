import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'lg', invert?: boolean }> = ({ size = 'sm', invert = false }) => (
  <div className={`flex flex-col items-center ${invert ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
    <div className={`${size === 'lg' ? 'w-16 h-16 mb-4' : 'w-8 h-8 mb-1'} bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-brand-600 shadow-lg`}>
      <svg className={size === 'lg' ? 'w-10 h-10' : 'w-5 h-5'} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z"/></svg>
    </div>
    {size === 'lg' && (
      <>
        <h1 className="text-2xl font-bold">TORO GROUP</h1>
        <p className="text-blue-100 text-sm mt-1">Sistema de Gestión Financiera</p>
      </>
    )}
    {size === 'sm' && (
      <div>
         <h2 className="text-white font-bold text-lg leading-none">Toro Group</h2>
         <p className="text-xs text-slate-500">Gestión Financiera</p>
      </div>
    )}
  </div>
);
