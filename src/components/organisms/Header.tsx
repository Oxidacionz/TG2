import { useLocation } from "react-router";

import { UserDropdown } from "../molecules/UserDropdown";
import { NotificationDropdown } from "../molecules/NotificationDropdown";

import { FaRegMoon, FaSun } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

interface HeaderProps {
  // currentView removed

  isDarkMode: boolean;
  toggleTheme: () => void;
  onMenuClick?: () => void;

  userEmail?: string;
  onSettings?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  // currentView,

  isDarkMode,
  toggleTheme,
  onMenuClick,
  userEmail,
  onSettings,
  onLogout,
}) => (
  <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center gap-3">
      <button
        onClick={onMenuClick}
        className="-ml-2 rounded-lg p-2 text-slate-500 hover:text-slate-700 md:hidden dark:text-slate-400 dark:hover:text-slate-200"
      >
        <FaBars className="h-6 w-6" />
      </button>
      <HeadingTitle />
    </div>
    <div className="flex items-center gap-2 md:gap-4">
      <button
        onClick={(e) => {
          toggleTheme();
          e.currentTarget.classList.toggle("rotate-transition");
        }}
        className="transition-rotate cursor-pointer p-2 text-slate-500 duration-300 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
      >
        {isDarkMode ? (
          <FaSun className="h-6 w-6" />
        ) : (
          <FaRegMoon className="h-6 w-6" />
        )}
      </button>

      <NotificationDropdown />

      <div className="mx-1 h-6 w-px bg-slate-200 md:mx-2 dark:bg-slate-700"></div>
      <UserDropdown
        userEmail={userEmail}
        onSettings={onSettings}
        onLogout={onLogout}
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
