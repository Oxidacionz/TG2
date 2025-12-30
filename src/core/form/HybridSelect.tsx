import { ChangeEvent, useState } from "react";

import Input from "./Input";
import Select from "./Select";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  id?: string;
  customOptionLabel?: string;
  placeholder?: string;
  inputType?: "text" | "number";
}

const HybridSelect = (props: Props) => {
  const [isManual, setIsManual] = useState(false);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "custom_trigger") {
      setIsManual(true);
      props.onChange("");
    } else {
      props.onChange(value);
    }
  };

  if (isManual) {
    return (
      <div className="relative w-full">
        <Input
          id={props.id}
          type={props.inputType}
          autoFocus
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
        />
        <button
          type="button"
          onClick={() => {
            setIsManual(false);
            props.onChange(props.options[0]?.value || "");
          }}
          className="hover:text-brand-500 absolute top-1/2 right-2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase"
        >
          Reset
        </button>
      </div>
    );
  }

  return (
    <Select
      id={props.id}
      value={props.value}
      onChange={handleSelectChange}
      options={props.options}
    >
      <option value="custom_trigger" className="text-brand-600 font-bold">
        {props.customOptionLabel}
      </option>
    </Select>
  );
};

export default HybridSelect;
