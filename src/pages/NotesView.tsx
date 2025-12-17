import React, { useState } from "react";
import { Card } from "../components/atoms/Card";
import { Button } from "../components/atoms/Button";
import { ICONS } from "../components/atoms/Icons";
import { Modal } from "../components/organisms/Modal";
import { Note } from "../types";

export const NotesView = () => {
  const [notes] = useState<Note[]>([
    {
      id: 1,
      content: "Nota mock 1",
      created_at: new Date().toISOString(),
      is_global: true,
      status: "ENVIADO",
    },
    {
      id: 2,
      content: "Nota mock 2",
      created_at: new Date().toISOString(),
      is_global: false,
      status: "PENDIENTE",
    },
  ]);
  const [operators] = useState([
    { id: "op1", username: "Operador 1" },
    { id: "op2", username: "Operador 2" },
  ]);
  const [activeTab, setActiveTab] = useState<"PENDIENTE" | "ENVIADAS">(
    "PENDIENTE",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create Note State
  const [content, setContent] = useState("");
  const [targetId, setTargetId] = useState("ALL"); // 'ALL' or specific ID

  const handleSendNote = () => {
    if (!content) return alert("Escribe algo");

    console.log("Mock Send Note:", { content, targetId });
    setIsModalOpen(false);
    setContent("");
    // fetchNotes();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Notas & Mensajes
          </h2>
          <p className="text-sm text-slate-500">Comunicaciones internas.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={<ICONS.Plus />}>
          Nueva Nota
        </Button>
      </div>

      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab("PENDIENTE")}
          className={`border-b-2 px-4 py-2 ${activeTab === "PENDIENTE" ? "border-brand-600 text-brand-600" : "border-transparent"}`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setActiveTab("ENVIADAS")}
          className={`border-b-2 px-4 py-2 ${activeTab === "ENVIADAS" ? "border-brand-600 text-brand-600" : "border-transparent"}`}
        >
          Enviadas/Historial
        </button>
      </div>

      <div className="space-y-4">
        {notes.length === 0 ? (
          <p className="py-10 text-center text-slate-500">No hay notas.</p>
        ) : (
          notes.map((note) => (
            <Card key={note.id} className="border-l-brand-500 border-l-4 p-4">
              <div className="flex justify-between">
                <h4 className="font-bold text-slate-800 dark:text-white">
                  {note.content}
                </h4>
                <span className="text-xs text-slate-400">
                  {new Date(note.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-2 flex gap-2 text-xs">
                <span className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-700">
                  {note.is_global ? "📢 Para Todos" : "👤 Privado"}
                </span>
                <span className="rounded bg-yellow-100 px-2 py-1 text-yellow-800">
                  {note.status}
                </span>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Nota"
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Mensaje
            </label>
            <textarea
              className="w-full rounded border p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Destinatario
            </label>
            <select
              className="w-full rounded border p-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              value={targetId}
              onChange={(e) => setTargetId(e.target.value)}
            >
              <option value="ALL">📢 Enviar a TODOS los camellos</option>
              {operators.map((op) => (
                <option key={op.id} value={op.id}>
                  👤 {op.username}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end pt-4">
            <Button onClick={handleSendNote}>Enviar Nota</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
