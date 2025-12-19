import { ReactNode } from "react";

interface TickerCardProps {
  label: string;
  icon: ReactNode;
  actionIcon?: ReactNode;
  onAction?: () => void;
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

export const TickerCard = ({
  label,
  icon,
  actionIcon,
  onAction,
  loading,
  children,
}: TickerCardProps) => {
  return (
    <article className="bg-brand-900 flex w-full flex-col justify-center gap-1 p-4 transition-colors hover:bg-slate-800/80 md:justify-start">
      <header className="mb-1 flex min-w-max items-center gap-1 text-[10px] font-bold text-slate-500 uppercase">
        {icon}
        <span>{label}</span>
        {actionIcon && (
          <button
            type="button"
            onClick={onAction}
            aria-label={`Actualizar ${label}`}
            className="ml-1 cursor-pointer border-none bg-transparent p-0 text-slate-600 transition-colors hover:text-white"
          >
            {actionIcon}
          </button>
        )}
      </header>
      <div className="flex min-h-[40px] flex-col justify-center gap-0.5">
        {loading ? (
          <div className="flex animate-pulse flex-col gap-1">
            <div className="h-4 w-20 rounded bg-slate-700"></div>
            <div className="h-3 w-16 rounded bg-slate-700"></div>
          </div>
        ) : (
          children
        )}
      </div>
    </article>
  );
};
