import { useLocation } from "react-router";
import { UserDropdown } from "@core/navigation/UserDropdown";
import { NotificationDropdown } from "@core/navigation/NotificationDropdown";
import { ThemeToggle } from "@core/ui/ThemeToggle";
import { FaBars } from "react-icons/fa6";

interface Props {
  onMenuClick?: () => void;
  userEmail?: string;
  onSettings?: () => void;
  onLogout?: () => void;
}

export const Header = (props: Props) => (
  <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center gap-3">
      <button
        onClick={props.onMenuClick}
        className="-ml-2 rounded-lg p-2 text-slate-500 hover:text-slate-700 md:hidden dark:text-slate-400 dark:hover:text-slate-200"
      >
        <FaBars className="h-6 w-6" />
      </button>
      <HeadingTitle />
    </div>
    <div className="flex items-center gap-2 md:gap-4">
      <ThemeToggle />

      <NotificationDropdown />

      <div className="mx-1 h-6 w-px bg-slate-200 md:mx-2 dark:bg-slate-700"></div>
      <UserDropdown
        userEmail={props.userEmail}
        onSettings={props.onSettings}
        onLogout={props.onLogout}
      />
    </div>
  </header>
);

const HeadingTitle = () => {
  const location = useLocation();
  const path = location.pathname.substring(1); // remove leading slash

  // Map paths to titles
  const titles: Record<string, string> = {
    "": "Dashboard",
    dashboard: "Dashboard",
    transactions: "Transacciones",
    clients: "Clientes",
    operators: "Operadores",
    expenses: "Gastos",
    reports: "Reportes",
    accounts: "Cuentas & Bancos",
    notes: "Notas",
    dev: "Modo Dev",
  };

  const title = titles[path] || titles[""] || "Toro Group";

  return (
    <h1 className="truncate text-lg font-bold text-slate-800 capitalize md:text-xl dark:text-white">
      {title}
    </h1>
  );
};
