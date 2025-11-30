import React, { ReactNode } from "react";

export const DashboardTemplate: React.FC<{
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}> = ({ sidebar, header, children }) => (
  <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
    {sidebar}
    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
      {header}
      <div className="flex-1 overflow-y-auto scroll-smooth p-6">{children}</div>
    </main>
  </div>
);
