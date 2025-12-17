import React from "react";

export const Badge = React.memo<{ status: string }>(({ status }) => {
  const styles: Record<string, string> = {
    Completado:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800",
    Pendiente:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800",
    Cancelado:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800",
    Default:
      "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] || styles.Default}`}
    >
      {status}
    </span>
  );
});

Badge.displayName = "Badge";
