import React, { ReactNode } from 'react';

export const SidebarItem: React.FC<{ icon: ReactNode; label: string; active?: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
      active 
        ? 'text-brand-400 bg-slate-800 border-r-2 border-brand-500' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
