import React, { useState, useEffect } from "react";
import { ICONS } from "../atoms/Icons";
import { supabase } from "../../lib/supabaseClient";

export const UserDropdown: React.FC<{
  onLogout?: () => void;
  userEmail?: string;
  onSettings?: () => void;
}> = ({ onLogout, userEmail, onSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState("Cargando...");

  // Extraer nombre del email si no hay nombre de usuario (ej. admin@... -> admin)
  const displayName = userEmail ? userEmail.split("@")[0] : "ToroUser";

  useEffect(() => {
    // Obtener rol real de Supabase
    const fetchRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        if (data) setRole(data.role);
      }
    };
    fetchRole();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-600 hover:bg-brand-700 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white transition-colors"
      >
        {displayName.charAt(0).toUpperCase()}
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="animate-fade-in-down absolute right-0 z-20 mt-2 w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-800">
            <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                {displayName}
              </p>
              <p
                className={`text-xs font-bold ${role === "ADMIN" ? "text-purple-500" : "text-brand-500"}`}
              >
                {role}
              </p>
              <p className="truncate text-xs text-slate-500">{userEmail}</p>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                if (onSettings) onSettings();
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <ICONS.Users /> Configuración
            </button>
            <div className="mt-1 border-t border-slate-200 dark:border-slate-700"></div>
            <button
              onClick={() => {
                if (onLogout) onLogout();
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              Cerrar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
};
