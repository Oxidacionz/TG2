import React, { type ReactNode } from "react";

interface Props {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
  htmlFor?: string;
  error?: string;
}

export const FormField = React.memo((props: Props) => {
  const { label, icon, children, htmlFor, error } = props;
  return (
    <div className="space-y-1">
      <label
        htmlFor={htmlFor}
        className="text-sm font-medium text-slate-700 dark:text-slate-300"
      >
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
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
});

FormField.displayName = "FormField";
