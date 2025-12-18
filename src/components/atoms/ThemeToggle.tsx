import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="transition-rotate cursor-pointer p-2 text-slate-500 duration-300 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
      aria-label={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
    >
      {theme === "light" ? (
        <FaRegMoon className="h-6 w-6" />
      ) : (
        <FaRegSun className="h-6 w-6" />
      )}
    </button>
  );
};
