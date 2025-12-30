import {
  MouseEvent,
  useEffect,
  useRef,
  type ReactNode,
  type SyntheticEvent,
} from "react";
import { MdClose } from "react-icons/md";

type ModalSize = "sm" | "md" | "lg" | "xl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: ModalSize;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
};

function syncDialogState(dialog: HTMLDialogElement, isOpen: boolean) {
  const shouldOpen = isOpen && !dialog.open;
  const shouldClose = !isOpen && dialog.open;

  if (shouldOpen) dialog.showModal();
  if (shouldClose) dialog.close();
}

const Modal = (props: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const widthClass = sizeClasses[props.size || "xl"];
  const className = `fixed inset-4 m-auto ${widthClass} max-h-[90vh] flex-col rounded-xl border border-slate-200 bg-white p-0 text-left shadow-2xl outline-none backdrop:bg-black/50 backdrop:backdrop-blur-sm open:flex dark:border-slate-700 dark:bg-slate-900 ${props.className || ""}`;

  function handleCancel(e: SyntheticEvent<HTMLDialogElement, Event>) {
    e.preventDefault();
    props.onClose();
  }

  function handleBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    const isDialog = e.target === dialogRef.current;
    if (isDialog) props.onClose();
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) syncDialogState(dialog, props.isOpen);
  }, [props.isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className={className}
    >
      <header className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-700">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          {props.title}
        </h3>
        <button
          onClick={props.onClose}
          type="button"
          className="rounded-full p-1 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <MdClose className="h-6 w-6" />
        </button>
      </header>
      <section className="overflow-y-auto p-6">{props.children}</section>
    </dialog>
  );
};

export default Modal;
