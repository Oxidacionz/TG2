// COMPONENTE CRITICO

import { LoginForm } from "../components/LoginForm";
import { Logo } from "@core/ui/Logo";

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-8 p-4">
        <div className="flex flex-col gap-8 overflow-hidden rounded-xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-800">
          <Logo size="lg" />
          <LoginForm />
        </div>

        <p className="w-full px-4 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Toro Group Financial. Todos los
          derechos reservados.
        </p>
      </div>
    </div>
  );
};
