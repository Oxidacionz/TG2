import type { ReactNode } from "react";

interface Props {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

const DashboardTemplate = (props: Props) => (
  <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
    {props.sidebar}
    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
      {props.header}
      <div className="flex-1 overflow-y-auto scroll-smooth p-6">
        {props.children}
      </div>
    </main>
  </div>
);

export default DashboardTemplate;
