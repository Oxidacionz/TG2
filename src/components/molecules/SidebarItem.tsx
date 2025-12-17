import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

export const SidebarItem = (props: Props) => {
  const { icon, label, active, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-start gap-3 px-4 py-3 text-sm font-medium ${
        active
          ? "border-brand-500 text-brand-400 border-r-2 bg-slate-800"
          : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
