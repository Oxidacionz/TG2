import { ReactNode } from "react";

interface Props {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

const DashboardTemplate = (props: Props) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {props.sidebar}
      <div className="flex flex-1 flex-col overflow-hidden">
        {props.header}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default DashboardTemplate;
