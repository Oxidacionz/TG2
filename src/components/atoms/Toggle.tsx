import React from "react";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Toggle = React.memo((props: Props) => {
  const { checked, onChange, label } = props;
  return (
    <div
      className="flex cursor-pointer items-center"
      onClick={() => onChange(!checked)}
    >
      <div
        className={`relative h-6 w-11 rounded-full ease-in-out ${checked ? "bg-brand-600" : "bg-slate-300 dark:bg-slate-700"}`}
      >
        <div
          className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ease-in-out ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}
    </div>
  );
});

Toggle.displayName = "Toggle";
