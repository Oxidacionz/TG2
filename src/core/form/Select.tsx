import { forwardRef, SelectHTMLAttributes } from "react";

interface Option {
  label: string;
  value: string | number;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { options, className = "", placeholder = "Seleccionar", ...props },
  ref,
) {
  const styles =
    "h-9.5 focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-shadow focus:border-transparent focus:ring-2 focus:outline-none focus:ring-inset dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  return (
    <select ref={ref} className={`${styles} ${className}`} {...props}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt.label} value={opt.value}>
          {opt.label}
        </option>
      ))}
      {props.children}
    </select>
  );
});

export default Select;
