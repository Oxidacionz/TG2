
import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => (
  <div className="flex items-center cursor-pointer" onClick={() => onChange(!checked)}>
    <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${checked ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
      <div 
        className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-in-out shadow-sm ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </div>
    {label && <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>}
  </div>
);
