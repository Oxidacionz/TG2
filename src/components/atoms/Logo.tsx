import React from "react";

interface Props {
  size?: "sm" | "lg";
  invert?: boolean;
}

export const Logo = React.memo((props: Props) => {
  const { size = "sm", invert = false } = props;
  return (
    <div
      className={`flex flex-col items-center ${invert ? "text-white" : "text-slate-900 dark:text-white"}`}
    >
      <div
        className={`${size === "lg" ? "mb-4 h-16 w-16" : "mb-1 h-8 w-8"} text-brand-600 flex items-center justify-center rounded-full bg-white shadow-lg dark:bg-slate-800`}
      >
        <svg
          className={size === "lg" ? "h-10 w-10" : "h-5 w-5"}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
        </svg>
      </div>
      {size === "lg" && (
        <>
          <h1 className="text-2xl font-bold">TORO GROUP</h1>
          <p className="mt-1 text-sm text-blue-100">
            Sistema de Gestión Financiera
          </p>
        </>
      )}
      {size === "sm" && (
        <div>
          <h2 className="text-lg leading-none font-bold text-white">
            Toro Group
          </h2>
          <p className="text-xs text-slate-500">Gestión Financiera</p>
        </div>
      )}
    </div>
  );
});

Logo.displayName = "Logo";
