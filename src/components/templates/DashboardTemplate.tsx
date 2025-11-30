import React, { ReactNode } from 'react';

export const DashboardTemplate: React.FC<{ 
  sidebar: ReactNode; 
  header: ReactNode; 
  children: ReactNode; 
}> = ({ sidebar, header, children }) => (
  <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
    {sidebar}
    <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
      {header}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {children}
      </div>
    </main>
  </div>
);
