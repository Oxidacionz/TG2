import React, { ReactNode } from "react";
import { MdClose } from "react-icons/md";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export const Modal = (props: Props) => {
  const { isOpen, onClose, title, children, size = "md" } = props;
  const widthClass =
    size === "lg" ? "max-w-4xl" : size === "sm" ? "max-w-md" : "max-w-2xl";
  if (!isOpen) return null;
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
            className="rounded-full p-1 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <MdClose className="h-6 w-6" />
          </button>
        </div>
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};
