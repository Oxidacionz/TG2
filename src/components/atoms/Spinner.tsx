import { CgSpinner } from "react-icons/cg";

interface Props {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export const Spinner = ({ size = "md", className = "" }: Props) => {
  return (
    <CgSpinner
      className={`text-brand-600 animate-spin ${sizes[size]} ${className}`}
    />
  );
};
