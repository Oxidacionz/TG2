import React from "react";
import { useLocation, useNavigate } from "react-router";

import { SidebarItem } from "../molecules/SidebarItem";
import { Logo } from "../atoms/Logo";
import { MdClose, MdSpaceDashboard, MdAttachMoney } from "react-icons/md";
import { IoScan, IoPeople, IoDocuments } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";

interface SidebarProps {
  // currentView removed
  // onViewChange removed

  onScan: () => void;
  onSupport: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  userRole?: string; // Prop nueva
}

export const Sidebar: React.FC<SidebarProps> = ({
  // currentView,
  // onViewChange,

  onScan,
  onSupport,
  isOpen,
  onClose,
  userRole,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-64 shrink-0 flex-col bg-slate-900 text-slate-300 shadow-2xl transition-transform duration-300 ease-in-out md:shadow-none ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0`}
      >
        <div className="relative flex flex-col items-center border-b border-slate-800 p-6">
          <div className="mb-1 flex items-center gap-3">
            <Logo size="sm" invert />
          </div>
          {/* Close button mobile only */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-white md:hidden"
          >
            <MdClose />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={onScan}
            className="bg-brand-600 hover:bg-brand-700 shadow-brand-900/50 flex w-full transform items-center justify-center gap-2 rounded-xl py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
          >
            <IoScan className="h-6 w-6" /> Escanear / Nuevo
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2">
          <SidebarItem
            icon={<MdSpaceDashboard className="h-6 w-6" />}
            label="Dashboard"
            active={currentPath === "/"}
            onClick={() => handleNavigation("/")}
          />

          <SidebarItem
            icon={<GrTransaction className="h-6 w-6" />}
            label="Transacciones"
            active={currentPath === "/transactions"}
            onClick={() => handleNavigation("/transactions")}
          />

          <SidebarItem
            icon={<MdAttachMoney className="h-6 w-6" />}
            label="Tesorería"
            active={currentPath === "/accounts"}
            onClick={() => handleNavigation("/accounts")}
          />

          <SidebarItem
            icon={<IoPeople className="h-6 w-6" />}
            label="Clientes"
            active={currentPath === "/clients"}
            onClick={() => handleNavigation("/clients")}
          />

          <SidebarItem
            icon={<FaUserTie className="h-6 w-6" />}
            label="Camellos"
            active={currentPath === "/operators"}
            onClick={() => handleNavigation("/operators")}
          />

          <SidebarItem
            icon={<IoDocuments className="h-6 w-6" />}
            label="Notas"
            active={currentPath === "/notes"}
            onClick={() => handleNavigation("/notes")}
          />

          <SidebarItem
            icon={<MdAttachMoney className="h-6 w-6" />}
            label="Gastos"
            active={currentPath === "/expenses"}
            onClick={() => handleNavigation("/expenses")}
          />

          <SidebarItem
            icon={<TbReportAnalytics className="h-6 w-6" />}
            label="Reportes"
            active={currentPath === "/reports"}
            onClick={() => handleNavigation("/reports")}
          />

          {/* Sección Especial para Dev Mode - VISIBLE SOLO PARA ROL DEV */}
          {userRole === "DEV" && (
            <div className="mt-4 border-t border-slate-800 pt-4">
              <p className="mb-2 px-4 text-xs font-bold text-slate-500 uppercase">
                Administración
              </p>
              <SidebarItem
                icon={<IoScan className="h-6 w-6" />} // Reusing an icon or import a specific Code icon if available. I'll use IoScan for now or just generic.
                label="Modo Dev"
                active={currentPath === "/dev"}
                onClick={() => handleNavigation("/dev")}
              />
            </div>
          )}
        </nav>
        <div className="border-t border-slate-800 bg-slate-900 p-4">
          <button
            onClick={onSupport}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-3 text-sm text-slate-300 hover:bg-slate-700"
          >
            <BiSupport className="h-6 w-6" /> Soporte Técnico
          </button>
        </div>
      </aside>
    </>
  );
};
