
import React from 'react';
import { ICONS } from '../atoms/Icons';
import { UserDropdown } from '../molecules/UserDropdown';
import { NotificationDropdown } from '../molecules/NotificationDropdown';

interface HeaderProps {
    currentView: string;
    isDarkMode: boolean;
    toggleTheme: () => void;
    onMenuClick?: () => void;
    onLogout?: () => void;
    userEmail?: string;
    onSettings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, isDarkMode, toggleTheme, onMenuClick, onLogout, userEmail, onSettings }) => (
  <header className="bg-white dark:bg-slate-900 h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 flex-shrink-0 transition-colors duration-200 sticky top-0 z-10">
    <div className="flex items-center gap-3">
      <button 
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg"
      >
        <ICONS.Menu />
      </button>
      <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white capitalize truncate">
        {currentView === 'operators' ? 'Operadores' : currentView === 'accounts' ? 'Cuentas & Bancos' : currentView}
      </h1>
    </div>
    <div className="flex items-center gap-2 md:gap-4">
       <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors">
          {isDarkMode ? <ICONS.Sun /> : <ICONS.Moon />}
       </button>
       
       <NotificationDropdown />

       <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 md:mx-2"></div>
       <UserDropdown onLogout={onLogout} userEmail={userEmail} onSettings={onSettings} />
    </div>
  </header>
);
