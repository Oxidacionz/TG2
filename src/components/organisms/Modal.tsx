import React, { type ReactNode } from "react";
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
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  const widthClass =
    size === "lg" ? "max-w-4xl" : size === "sm" ? "max-w-md" : "max-w-2xl";

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={`fixed top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm dark:bg-slate-900 ${widthClass} max-h-[90vh] w-full flex-col border border-slate-200 p-0 text-left open:flex dark:border-slate-700`}
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
    </dialog>
  );
};
