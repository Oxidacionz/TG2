import React, { useState } from "react";
import { Modal } from "./Modal";
// Supabase removed
import { FormField } from "../molecules/FormField";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
  // TODO: Add strict user object prop if we have one
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userEmail,
}) => {
  // En una App real, estos datos vendrían del Objeto User de Supabase o Contexto
  const username = userEmail ? userEmail.split("@")[0] : "Usuario";
  const role = "ADMIN"; // Idealmente leer de metadata

  const [newUsername, setNewUsername] = useState(username);
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    // Here we would call authService.updateProfile()
    console.log("Mock update username:", newUsername);

    setTimeout(() => {
      setLoading(false);
      onClose();
      // Router revalidation would happen automatically if we updated global state
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configuración de Perfil">
      <div className="space-y-6">
        <div className="flex items-center gap-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
          <div className="bg-brand-600 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white">
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-bold dark:text-white">{userEmail}</p>
            <p className="text-xs text-slate-500">Rol: {role}</p>
            <span
              className={`rounded px-2 py-0.5 text-xs ${role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}
            >
              {role}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <FormField label="Nombre de Usuario">
            <Input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </FormField>

          <div className="rounded border border-yellow-200 bg-yellow-50 p-3 text-xs text-yellow-800">
            Nota: El rol de usuario (ADMIN/OPERADOR) solo puede ser modificado
            directamente en la base de datos por seguridad.
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
