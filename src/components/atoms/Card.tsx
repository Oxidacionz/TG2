import React, { ReactNode } from "react";

export const Card: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${className}`}
  >
    {children}
  </div>
);
