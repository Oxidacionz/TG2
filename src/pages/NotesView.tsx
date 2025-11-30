
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Card } from '../components/atoms/Card'
import { Button } from '../components/atoms/Button'
import { ICONS } from '../components/atoms/Icons'
import { Modal } from '../components/organisms/Modal'


export const NotesView = () => {
    const [notes, setNotes] = useState<any[]>([]);
    const [operators, setOperators] = useState([]);
    const [activeTab, setActiveTab] = useState<'PENDIENTE' | 'ENVIADAS'>('PENDIENTE');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Create Note State
    const [content, setContent] = useState('');
    const [targetId, setTargetId] = useState('ALL'); // 'ALL' or specific ID

    const fetchNotes = async () => {
        // En un caso real filtraríamos por usuario actual
        const { data } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
        if(data) setNotes(data);
    };

    const fetchOperators = async () => {
        const { data } = await supabase.from('profiles').select('id, username').neq('role', 'ADMIN');
        if(data) setOperators(data as any);
    };

    useEffect(() => {
        fetchNotes();
        fetchOperators();
    }, []);

    const handleSendNote = async () => {
        if(!content) return alert('Escribe algo');

        const { error } = await supabase.from('notes').insert({
            content,
            target_id: targetId === 'ALL' ? null : targetId,
            is_global: targetId === 'ALL',
            status: 'PENDIENTE',
            sender_id: (await supabase.auth.getUser()).data.user?.id
        });

        if(error) alert(error.message);
        else {
            setIsModalOpen(false);
            setContent('');
            fetchNotes();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">Notas & Mensajes</h2>
                    <p className="text-sm text-slate-500">Comunicaciones internas.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} icon={<ICONS.Plus />}>Nueva Nota</Button>
            </div>

            <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
                <button onClick={() => setActiveTab('PENDIENTE')} className={`px-4 py-2 border-b-2 ${activeTab === 'PENDIENTE' ? 'border-brand-600 text-brand-600' : 'border-transparent'}`}>Pendientes</button>
                <button onClick={() => setActiveTab('ENVIADAS')} className={`px-4 py-2 border-b-2 ${activeTab === 'ENVIADAS' ? 'border-brand-600 text-brand-600' : 'border-transparent'}`}>Enviadas/Historial</button>
            </div>

            <div className="space-y-4">
                {notes.length === 0 ? <p className="text-slate-500 text-center py-10">No hay notas.</p> :
                 notes.map(note => (
                    <Card key={note.id} className="p-4 border-l-4 border-l-brand-500">
                        <div className="flex justify-between">
                            <h4 className="font-bold text-slate-800 dark:text-white">{note.content}</h4>
                            <span className="text-xs text-slate-400">{new Date(note.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="mt-2 flex gap-2 text-xs">
                            <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                                {note.is_global ? '📢 Para Todos' : '👤 Privado'}
                            </span>
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{note.status}</span>
                        </div>
                    </Card>
                 ))
                }
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Nota">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Mensaje</label>
                        <textarea className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white" rows={3} value={content} onChange={e => setContent(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Destinatario</label>
                        <select className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700 dark:text-white" value={targetId} onChange={e => setTargetId(e.target.value)}>
                            <option value="ALL">📢 Enviar a TODOS los camellos</option>
                            {operators.map(op => (
                                <option key={op.id} value={op.id}>👤 {op.username}</option>
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
