import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Card } from "../components/atoms/Card";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
import { ICONS } from "../components/atoms/Icons";
import { Modal } from "../components/organisms/Modal";
import { FormField } from "../components/molecules/FormField";

export const ClientsView = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("name");
    if (data) setClients(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreateClient = async () => {
    if (!newName) return alert("El nombre es obligatorio");

    const { error } = await supabase.from("clients").insert({
      name: newName,
      phone: newPhone,
      email: newEmail,
    });

    if (error) {
      alert("Error al crear cliente: " + error.message);
    } else {
      setIsModalOpen(false);
      setNewName("");
      setNewPhone("");
      setNewEmail("");
      fetchClients();
    }
  };

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.phone && c.phone.includes(searchTerm)),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Directorio de Clientes
          </h2>
          <p className="text-sm text-slate-500">
            Gestión de cartera de clientes frecuentes.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={<ICONS.Plus />}>
          Nuevo Cliente
        </Button>
      </div>

      <Card className="p-4">
        <div className="relative">
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400">
            <ICONS.Search />
          </div>
          <Input
            placeholder="Buscar cliente por nombre o teléfono..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="col-span-3 text-center text-slate-500">
            Cargando clientes...
          </p>
        ) : filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <Card
              key={client.id}
              className="flex flex-col gap-2 p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-100 dark:bg-brand-900/30 text-brand-600 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">
                      {client.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Registrado:{" "}
                      {new Date(client.created_at || "").toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                {client.phone && (
                  <p className="flex items-center gap-2">
                    <span className="text-slate-400">📱</span> {client.phone}
                  </p>
                )}
                {client.email && (
                  <p className="flex items-center gap-2">
                    <span className="text-slate-400">✉️</span> {client.email}
                  </p>
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-3 py-10 text-center text-slate-400">
            <ICONS.Users />
            <p className="mt-2">No se encontraron clientes.</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Registrar Nuevo Cliente"
      >
        <div className="space-y-4">
          <FormField label="Nombre Completo">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Ej. Juan Pérez"
            />
          </FormField>
          <FormField label="Teléfono / WhatsApp">
            <Input
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              placeholder="+58 412..."
            />
          </FormField>
          <FormField label="Correo Electrónico">
            <Input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="cliente@email.com"
            />
          </FormField>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateClient}>Guardar Cliente</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
