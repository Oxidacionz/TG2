import React, { useState } from 'react';
import { ICONS } from '../atoms/Icons';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { FormField } from '../molecules/FormField';
import { Modal } from './Modal';
import { supabase } from '../../lib/supabaseClient';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para el ojo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estado para el Modal de Soporte
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [supportIssue, setSupportIssue] = useState('Olvidé mi contraseña');
  const [supportDesc, setSupportDesc] = useState('');

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
    // Si es exitoso, App.tsx detectará el cambio de sesión automáticamente
  };

  const handleSendSupport = () => {
    const subject = encodeURIComponent(`Soporte Toro Group: ${supportIssue}`);
    const bodyText = supportIssue === 'Otros' ? supportDesc : `Hola, tengo el siguiente problema: ${supportIssue}`;
    const body = encodeURIComponent(bodyText);

    window.open(`mailto:josephbrachovillanueva2@gmail.com?subject=${subject}&body=${body}`);
    setIsSupportOpen(false);
    setSupportDesc('');
    setSupportIssue('Olvidé mi contraseña');
  };

  return (
    <div className="p-8">
      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded text-sm mb-4">
            {error === 'Invalid login credentials' ? 'Usuario o contraseña incorrectos' : error}
          </div>
        )}

        <FormField label="Email" icon={<ICONS.Users />}>
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
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Contraseña</label>
          <div className="relative">
            {/* Candado a la izquierda */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
            </div>

            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pl-10 pr-10" // Padding extra a la derecha para el ojo
              required
            />

            {/* Ojo (Toggle) a la derecha */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none"
            >
              {showPassword ? <ICONS.EyeOff /> : <ICONS.Eye />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember" className="rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
          <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400">Recordar mis datos</label>
        </div>

        <Button type="submit" className="w-full justify-center" disabled={loading}>
          {loading ? 'Verificando...' : 'Iniciar Sesión'} <span className="ml-2">→</span>
        </Button>
      </form>

      <div className="mt-6 text-center text-sm space-y-2">
        <button
          onClick={() => setIsSupportOpen(true)}
          type="button"
          className="text-brand-600 font-medium flex items-center justify-center gap-1 w-full hover:underline"
        >
           <ICONS.Support /> Contactar Soporte Técnico
        </button>
      </div>

      {/* Modal de Soporte */}
      <Modal
         isOpen={isSupportOpen}
         onClose={() => setIsSupportOpen(false)}
         title="Soporte Técnico"
      >
         <div className="space-y-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">Selecciona el tipo de problema para contactar al administrador.</p>

            <div className="space-y-1">
               <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tipo de Problema</label>
               <select
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
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
            {supportIssue === 'Otros' && (
              <div className="space-y-1 animate-fade-in">
                 <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Describe el problema</label>
                 <textarea
                    className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none dark:text-white"
                    rows={4}
                    placeholder="Detalla lo que sucedió..."
                    value={supportDesc}
                    onChange={(e) => setSupportDesc(e.target.value)}
                 ></textarea>
              </div>
            )}

            <Button className="w-full" icon={<ICONS.Send />} onClick={handleSendSupport}>
               Enviar Correo
            </Button>
         </div>
      </Modal>
    </div>
  );
};
