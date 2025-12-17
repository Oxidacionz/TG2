import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Card = (props: Props) => {
  const { children, className = "" } = props;
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      {children}
    </div>
  );
};
