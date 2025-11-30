
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Card } from '../components/atoms/Card'
import { Button } from '../components/atoms/Button'
import { Input } from '../components/atoms/Input'
import { ICONS } from '../components/atoms/Icons'
import { Modal } from '../components/organisms/Modal'
import { FormField } from '../components/molecules/FormField'
import { Client } from '../../types';

export const ClientsView = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const fetchClients = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('clients').select('*').order('name');
    if (data) setClients(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreateClient = async () => {
    if (!newName) return alert('El nombre es obligatorio');

    const { error } = await supabase.from('clients').insert({
      name: newName,
      phone: newPhone,
      email: newEmail
    });

    if (error) {
      alert('Error al crear cliente: ' + error.message);
    } else {
      setIsModalOpen(false);
      setNewName('');
      setNewPhone('');
      setNewEmail('');
      fetchClients();
    }
  };

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.phone && c.phone.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-lg font-bold text-slate-800 dark:text-white">Directorio de Clientes</h2>
           <p className="text-sm text-slate-500">Gestión de cartera de clientes frecuentes.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={<ICONS.Plus />}>Nuevo Cliente</Button>
      </div>

      <Card className="p-4">
        <div className="relative">
           <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><ICONS.Search /></div>
           <Input
             placeholder="Buscar cliente por nombre o teléfono..."
             className="pl-10"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <p className="text-slate-500 col-span-3 text-center">Cargando clientes...</p> :
         filteredClients.length > 0 ? (
           filteredClients.map(client => (
             <Card key={client.id} className="p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 flex items-center justify-center font-bold text-lg">
                        {client.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-white">{client.name}</h3>
                        <p className="text-xs text-slate-500">Registrado: {new Date(client.created_at || '').toLocaleDateString()}</p>
                      </div>
                   </div>
                </div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 space-y-1">
                   {client.phone && <p className="flex items-center gap-2"><span className="text-slate-400">📱</span> {client.phone}</p>}
                   {client.email && <p className="flex items-center gap-2"><span className="text-slate-400">✉️</span> {client.email}</p>}
                </div>
             </Card>
           ))
         ) : (
           <div className="col-span-3 text-center py-10 text-slate-400">
             <ICONS.Users />
             <p className="mt-2">No se encontraron clientes.</p>
           </div>
         )
        }
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nuevo Cliente">
         <div className="space-y-4">
            <FormField label="Nombre Completo">
               <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Ej. Juan Pérez" />
            </FormField>
            <FormField label="Teléfono / WhatsApp">
               <Input value={newPhone} onChange={e => setNewPhone(e.target.value)} placeholder="+58 412..." />
            </FormField>
            <FormField label="Correo Electrónico">
               <Input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="cliente@email.com" />
            </FormField>
            <div className="pt-4 flex justify-end gap-2">
               <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
               <Button onClick={handleCreateClient}>Guardar Cliente</Button>
            </div>
         </div>
      </Modal>
    </div>
  );
};
