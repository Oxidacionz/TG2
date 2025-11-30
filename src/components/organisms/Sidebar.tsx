import React from "react";
import { SidebarItem } from "../molecules/SidebarItem";
import { Logo } from "../atoms/Logo";
import { MdClose, MdSpaceDashboard } from "react-icons/md";
import { IoScan } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onScan: () => void;
  onSupport: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  userRole?: string; // Prop nueva
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  onScan,
  onSupport,
  isOpen,
  onClose,
  userRole,
}) => (
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
          active={currentView === "dashboard"}
          onClick={() => onViewChange("dashboard")}
        />

        <SidebarItem
          icon={<GrTransaction className="h-6 w-6" />}
          label="Transacciones"
          active={currentView === "transactions"}
          onClick={() => onViewChange("transactions")}
        />

        {/*         <SidebarItem
          icon={<ICONS.Wallet />}
          label="Tesorería"
          active={currentView === "accounts"}
          onClick={() => onViewChange("accounts")}
        /> */}
        {/* 
        <SidebarItem
          icon={<ICONS.Users />}
          label="Clientes"
          active={currentView === "clients"}
          onClick={() => onViewChange("clients")}
        /> */}

        {/*         <SidebarItem
          icon={<ICONS.Camellos />}
          label="Camellos"
          active={currentView === "operators"}
          onClick={() => onViewChange("operators")}
        /> */}

        {/*         <SidebarItem
          icon={<ICONS.Notes />}
          label="Notas"
          active={currentView === "notes"}
          onClick={() => onViewChange("notes")}
        /> */}

        {/*         <SidebarItem
          icon={<ICONS.Expenses />}
          label="Gastos"
          active={currentView === "expenses"}
          onClick={() => onViewChange("expenses")}
        /> */}

        {/*         <SidebarItem
          icon={<ICONS.Reports />}
          label="Reportes"
          active={currentView === "reports"}
          onClick={() => onViewChange("reports")}
        /> */}

        {/* Sección Especial para Dev Mode - VISIBLE SOLO PARA ROL DEV */}
        {/*         {userRole === "DEV" && (
          <div className="mt-4 border-t border-slate-800 pt-4">
            <p className="mb-2 px-4 text-xs font-bold text-slate-500 uppercase">
              Administración
            </p>
            <SidebarItem
              icon={<ICONS.Code />}
              label="Modo Dev"
              active={currentView === "dev"}
              onClick={() => onViewChange("dev")}
            />
          </div>
        )} */}
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
