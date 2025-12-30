import { forwardRef, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  controlsNumber?: boolean;
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { controlsNumber = false, className = "", ...props },
  ref,
) {
  const styles =
    "focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-shadow focus:border-transparent focus:ring-2 focus:outline-none focus:ring-inset dark:border-slate-700 dark:bg-slate-800 dark:text-white";

  const noControlsStyles =
    "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  const shouldHideControls = props.type === "number" && !controlsNumber;

  return (
    <input
      ref={ref}
      className={`${styles} ${shouldHideControls ? noControlsStyles : ""} ${className}`}
      {...props}
    />
  );
});

export default Input;
