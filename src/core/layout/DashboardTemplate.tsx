import { ReactNode } from "react";

interface Props {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export const DashboardTemplate = ({ sidebar, header, children }: Props) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Sidebar Area */}
      {sidebar}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {header}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardTemplate;
