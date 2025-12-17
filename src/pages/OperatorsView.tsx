import { useState } from "react";
// Supabase removed
import { Card } from "../components/atoms/Card";
import { ICONS } from "../components/atoms/Icons";
import { Button } from "../components/atoms/Button";
import { Toggle } from "../components/atoms/Toggle";
import { Modal } from "../components/organisms/Modal";
import { Operator, Role } from "../types";

export const OperatorsView = () => {
  const [operators, setOperators] = useState<Operator[]>([
    {
      id: "op-1",
      username: "Camello_1",
      role: Role.OPERATOR,
      last_active: "Hace 5 min",
      is_active: true,
    },
    {
      id: "op-2",
      username: "Camello_2",
      role: Role.OPERATOR,
      last_active: "Hace 2 horas",
      is_active: true,
    },
  ]);
  const [loading] = useState(false);

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    // Optimistic update (Mock)
    setOperators((prev) =>
      prev.map((op) =>
        op.id === id ? { ...op, is_active: !currentStatus } : op,
      ),
    );
    console.log("Mock toggle operator:", id);
  };

  const handleDisableAll = () => {
    if (!confirm("¿Seguro que deseas deshabilitar a TODOS los camellos?"))
      return;

    // Mock disable all
    setOperators((prev) => prev.map((op) => ({ ...op, is_active: false })));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Operadores (Camellos)
          </h2>
          <p className="text-sm text-slate-500">
            Gestión de usuarios y permisos.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="danger" size="sm" onClick={handleDisableAll}>
            Deshabilitar Todos
          </Button>
          <Button onClick={() => setIsHelpOpen(true)} icon={<ICONS.Plus />}>
            Registrar Nuevo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p>Cargando...</p>
        ) : operators.length === 0 ? (
          <p className="text-slate-500">No hay operadores registrados.</p>
        ) : (
          operators.map((op) => (
            <Card
              key={op.id}
              className={`relative flex flex-col items-center border-2 p-6 text-center ${op.is_active ? "border-transparent" : "border-slate-200 opacity-75 dark:border-slate-700"}`}
            >
              <div className={`absolute top-4 right-4`}>
                <Toggle
                  checked={!!op.is_active}
                  onChange={() => handleToggleActive(op.id, !!op.is_active)}
                />
              </div>

              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-2xl font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                {op.username.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                {op.username}
              </h3>
              <span className="mt-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                {op.role}
              </span>
              <div className="mt-6 flex w-full justify-between border-t border-slate-100 pt-4 text-sm text-slate-500 dark:border-slate-700">
                <span>ID: {op.id.substring(0, 6)}...</span>
                <span
                  className={op.is_active ? "text-green-500" : "text-red-500"}
                >
                  {op.is_active ? "● Habilitado" : "○ Deshabilitado"}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="Registro de Operador"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300">
          <p>El registro de operadores está simulado.</p>
          <p className="text-sm">
            En modo mock, no se pueden agregar nuevos usuarios realmente.
          </p>
          <Button className="mt-2 w-full" onClick={() => setIsHelpOpen(false)}>
            Entendido
          </Button>
        </div>
      </Modal>
    </div>
  );
};
