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
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userEmail,
}) => {
  const [userId] = useState("123e4567-e89b-12d3-a456-426614174000"); // Mock ID
  const [username, setUsername] = useState("Admin Mock");
  const [role] = useState("ADMIN"); // Mock Role
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    // Mock update
    console.log("Mock update username:", username);
    onClose();
    window.location.reload();
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Configuración de Perfil">
      <div className="space-y-6">
        <div className="flex items-center gap-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
          <div className="bg-brand-600 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white">
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <p className="text-lg font-bold dark:text-white">{userEmail}</p>
            <p className="text-xs text-slate-500">ID: {userId}</p>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
