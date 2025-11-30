
import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { supabase } from '../../lib/supabaseClient';
import { FormField } from '../molecules/FormField';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    userEmail?: string;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, userEmail }) => {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchProfile();
        }
    }, [isOpen]);

    const fetchProfile = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            setUserId(user.id);
            const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            if (data) {
                setUsername(data.username || '');
                setRole(data.role || 'OPERADOR');
            }
        }
        setLoading(false);
    };

    const handleUpdate = async () => {
        setLoading(true);
        const { error } = await supabase.from('profiles').update({ username }).eq('id', userId);
        if (error) alert('Error: ' + error.message);
        else {
            onClose();
            // Opcional: Recargar página para reflejar cambios en header
            window.location.reload();
        }
        setLoading(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Configuración de Perfil">
            <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="w-16 h-16 rounded-full bg-brand-600 text-white flex items-center justify-center text-2xl font-bold">
                        {username ? username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <p className="font-bold text-lg dark:text-white">{userEmail}</p>
                        <p className="text-xs text-slate-500">ID: {userId}</p>
                        <span className={`text-xs px-2 py-0.5 rounded ${role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {role}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    <FormField label="Nombre de Usuario">
                        <Input value={username} onChange={e => setUsername(e.target.value)} />
                    </FormField>

                    <div className="p-3 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-200">
                        Nota: El rol de usuario (ADMIN/OPERADOR) solo puede ser modificado directamente en la base de datos por seguridad.
                    </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                    <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleUpdate} disabled={loading}>
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
