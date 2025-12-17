import type { ReactNode } from "react";

interface Props {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}

export const FormField = (props: Props) => {
  const { label, icon, children } = props;
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
