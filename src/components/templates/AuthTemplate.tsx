import React, { ReactNode } from 'react';
import { Logo } from '../atoms/Logo';
import { ICONS } from '../atoms/Icons';

export const AuthTemplate: React.FC<{ children: ReactNode, isDarkMode: boolean, toggleTheme: () => void }> = ({ children, isDarkMode, toggleTheme }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4 transition-colors duration-200">
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-slate-200 dark:border-slate-700 transition-colors duration-200">
      <div className="bg-brand-600 p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center">
          <Logo size="lg" invert />
        </div>
        <button 
          onClick={toggleTheme}
          className="absolute top-4 right-4 text-white/70 hover:text-white"
        >
          {isDarkMode ? <ICONS.Sun /> : <ICONS.Moon />}
        </button>
      </div>
      {children}
    </div>
  </div>
);
