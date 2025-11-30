import React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-shadow focus:border-transparent focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white ${className}`}
    {...props}
  />
));
Input.displayName = "Input";
