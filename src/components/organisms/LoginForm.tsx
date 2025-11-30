import React, { useState } from "react";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";
import { FormField } from "../molecules/FormField";
import { Modal } from "./Modal";
import { supabase } from "../../lib/supabaseClient";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para el ojo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estado para el Modal de Soporte
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportIssue, setSupportIssue] = useState("Olvidé mi contraseña");
  const [supportDesc, setSupportDesc] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSendSupport = () => {
    const subject = encodeURIComponent(`Soporte Toro Group: ${supportIssue}`);
    const bodyText =
      supportIssue === "Otros"
        ? supportDesc
        : `Hola, tengo el siguiente problema: ${supportIssue}`;
    const body = encodeURIComponent(bodyText);

    window.open(
      `mailto:josephbrachovillanueva2@gmail.com?subject=${subject}&body=${body}`,
    );
    setIsSupportOpen(false);
    setSupportDesc("");
    setSupportIssue("Olvidé mi contraseña");
  };

  return (
    <div className="p-8">
      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="mb-4 rounded border border-red-200 bg-red-100 p-3 text-sm text-red-700">
            {error === "Invalid login credentials"
              ? "Usuario o contraseña incorrectos"
              : error}
          </div>
        )}

        <FormField label="Email" icon={<FaUser />}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@torogroup.com"
            className="pl-10" // Se eliminaron las clases forzadas (bg-white/dark:bg-white) para que el Atom maneje el color correcto
            required
          />
        </FormField>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Contraseña
          </label>
          <div className="relative">
            {/* Candado a la izquierda */}
            <div className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
              <FaLock />
            </div>

            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pr-10 pl-10" // Padding extra a la derecha para el ojo
              required
            />

            {/* Ojo (Toggle) a la derecha */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none dark:hover:text-slate-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
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
          disabled={loading}
        >
          {loading ? "Verificando..." : "Iniciar Sesión"}{" "}
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

      {/* Modal de Soporte */}
      <Modal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        title="Soporte Técnico"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Selecciona el tipo de problema para contactar al administrador.
          </p>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Tipo de Problema
            </label>
            <select
              className="focus:ring-brand-500 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              value={supportIssue}
              onChange={(e) => setSupportIssue(e.target.value)}
            >
              <option value="Olvidé mi contraseña">Olvidé mi contraseña</option>
              <option value="Error de correo">Error de correo</option>
              <option value="Falla en software">Falla en software</option>
              <option value="Otros">Otros...</option>
            </select>
          </div>

          {/* Mostrar descripción solo si es "Otros" */}
          {supportIssue === "Otros" && (
            <div className="animate-fade-in space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Describe el problema
              </label>
              <textarea
                className="focus:ring-brand-500 w-full rounded-lg border border-slate-300 bg-white p-3 text-sm outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                rows={4}
                placeholder="Detalla lo que sucedió..."
                value={supportDesc}
                onChange={(e) => setSupportDesc(e.target.value)}
              ></textarea>
            </div>
          )}

          <Button
            className="w-full"
            icon={<IoIosSend />}
            onClick={handleSendSupport}
          >
            Enviar Correo
          </Button>
        </div>
      </Modal>
    </div>
  );
};
