import { useState, memo } from "react";
import { Input } from "@core/form/Input";
import { Button } from "@core/ui/Button";
import { FormField } from "@core/form/FormField";
import { authService } from "../../services/AuthService";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { SupportModal } from "./SupportModal";
import { FormProvider, useForm } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}

const EMAIL_VALIDATION = {
  required: "El email es requerido",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "El email es invalido",
  },
};

const PASSWORD_VALIDATION = {
  required: "La contraseña es requerida",
  minLength: {
    value: 4,
    message: "La contraseña debe tener al menos 4 caracteres",
  },
  maxLength: {
    value: 32,
    message: "La contraseña debe tener menos de 32 caracteres",
  },
};

export const LoginForm = memo(() => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const methods = useForm<LoginFormValues>();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const handleLogin = async (data: LoginFormValues) => {
    console.log("LoginForm Data:", data);
    // Clear root errors if any before new attempt
    const { error } = await authService.signInWithPassword(
      data.email,
      data.password,
    );

    if (error) setError("root", { message: error.message });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        {errors.root && (
          <div className="mb-4 rounded border border-red-200 bg-red-100 p-3 text-sm text-red-700">
            {errors.root.message === "Invalid login credentials"
              ? "Usuario o contraseña incorrectos"
              : errors.root.message}
          </div>
        )}

        <FormField
          htmlFor="email"
          label="Email"
          icon={<FaUser />}
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            {...register("email", EMAIL_VALIDATION)}
            placeholder="admin@torogroup.com"
            className="pl-10"
            required
            disabled={isSubmitting}
          />
        </FormField>

        <div className="space-y-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
              <FaLock />
            </div>

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", PASSWORD_VALIDATION)}
              placeholder="••••••••"
              className="pr-10 pl-10"
              required
              disabled={isSubmitting}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none dark:hover:text-slate-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-rose-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="text-brand-600 focus:ring-brand-500 rounded border-slate-300"
          />
          <label
            htmlFor="remember"
            className="text-sm text-slate-600 dark:text-slate-400"
          >
            Recordar mis datos
          </label>
        </div>

        <Button
          type="submit"
          className="w-full justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verificando..." : "Iniciar Sesión"}{" "}
          <span className="ml-2">→</span>
        </Button>
      </form>

      <div className="mt-6 space-y-2 text-center text-sm">
        <button
          onClick={() => setIsSupportOpen(true)}
          type="button"
          className="text-brand-600 flex w-full items-center justify-center gap-1 font-medium hover:underline"
        >
          <BiSupport /> Contactar Soporte Técnico
        </button>
      </div>

      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </FormProvider>
  );
});
// Add display name for debugging
LoginForm.displayName = "LoginForm";
