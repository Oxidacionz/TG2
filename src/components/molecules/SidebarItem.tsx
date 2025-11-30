import React, { ReactNode } from "react";

export const SidebarItem: React.FC<{
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium ${
      active
        ? "text-brand-400 border-brand-500 border-r-2 bg-slate-800"
        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);
