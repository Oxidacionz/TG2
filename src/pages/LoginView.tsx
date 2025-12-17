import { LoginForm } from "../components/organisms/LoginForm";
import { Logo } from "../components/atoms/Logo";

export const LoginView = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-sm space-y-8 px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <Logo size="lg" />
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Inicia sesión en tu cuenta
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Acceso administrativo al sistema financiero
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
          <LoginForm />
        </div>

        <p className="text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Toro Group Financial. Todos los
          derechos reservados.
        </p>
      </div>
    </div>
  );
};
