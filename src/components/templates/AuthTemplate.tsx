import React, { ReactNode } from "react";
import { Logo } from "../atoms/Logo";
import { ICONS } from "../atoms/Icons";

export const AuthTemplate: React.FC<{
  children: ReactNode;
  isDarkMode: boolean;
  toggleTheme: () => void;
}> = ({ children, isDarkMode, toggleTheme }) => (
  <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 transition-colors duration-200 dark:bg-slate-950">
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl transition-colors duration-200 dark:border-slate-700 dark:bg-slate-800">
      <div className="bg-brand-600 relative overflow-hidden p-8 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent opacity-10"></div>
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
