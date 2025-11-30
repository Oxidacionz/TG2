import React, { ReactNode } from 'react';

export const FormField: React.FC<{ label: string; icon?: ReactNode; children: ReactNode }> = ({ label, icon, children }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
      {children}
    </div>
  </div>
);
