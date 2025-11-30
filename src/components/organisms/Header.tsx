import React from "react";
import { ICONS } from "../atoms/Icons";
import { UserDropdown } from "../molecules/UserDropdown";
import { NotificationDropdown } from "../molecules/NotificationDropdown";

interface HeaderProps {
  currentView: string;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onMenuClick?: () => void;
  onLogout?: () => void;
  userEmail?: string;
  onSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  isDarkMode,
  toggleTheme,
  onMenuClick,
  onLogout,
  userEmail,
  onSettings,
}) => (
  <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6 dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center gap-3">
      <button
        onClick={onMenuClick}
        className="-ml-2 rounded-lg p-2 text-slate-500 hover:text-slate-700 md:hidden dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ICONS.Menu />
      </button>
      <h1 className="truncate text-lg font-bold text-slate-800 capitalize md:text-xl dark:text-white">
        {currentView === "operators"
          ? "Operadores"
          : currentView === "accounts"
            ? "Cuentas & Bancos"
            : currentView}
      </h1>
    </div>
    <div className="flex items-center gap-2 md:gap-4">
      <button
        onClick={(e) => {
          toggleTheme();
          e.currentTarget.classList.toggle("rotate-transition");
        }}
        className="transition-rotate cursor-pointer p-2 text-slate-500 duration-300 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
      >
        {isDarkMode ? <ICONS.Sun /> : <ICONS.Moon />}
      </button>

      <NotificationDropdown />

      <div className="mx-1 h-6 w-px bg-slate-200 md:mx-2 dark:bg-slate-700"></div>
      <UserDropdown
        onLogout={onLogout}
        userEmail={userEmail}
        onSettings={onSettings}
      />
    </div>
  </header>
);
