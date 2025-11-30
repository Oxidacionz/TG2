import React, { ReactNode } from "react";
import { ICONS } from "../atoms/Icons";

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}> = ({ isOpen, onClose, title, children, size = "md" }) => {
  if (!isOpen) return null;
  const widthClass =
    size === "lg" ? "max-w-4xl" : size === "sm" ? "max-w-md" : "max-w-2xl";
  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className={`w-full rounded-xl bg-white shadow-2xl dark:bg-slate-900 ${widthClass} flex max-h-[90vh] flex-col border border-slate-200 dark:border-slate-700`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-slate-500 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <ICONS.Close />
          </button>
        </div>
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};
