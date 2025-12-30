import {
  cloneElement,
  isValidElement,
  ReactElement,
  type ReactNode,
} from "react";

interface Props {
  label: string;
  children: ReactNode;
  icon?: ReactNode;
  htmlFor?: string;
  error?: string;
  className?: string;
}

const FormField = (props: Props) => {
  const renderError = <p className="text-xs text-rose-500">{props.error}</p>;
  const messageError = props.error ? renderError : null;
  const generatedId = crypto.randomUUID();

  return (
    <div className={props.className}>
      <label
        htmlFor={generatedId}
        className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {props.label}
      </label>
      <div className="relative">
        {isValidElement(props.children)
          ? cloneElement(props.children as ReactElement<{ id?: string }>, {
              id: generatedId,
            })
          : props.children}
      </div>
      {messageError}
    </div>
  );
};

export default FormField;
