
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Card } from '../components/atoms/Card'
import { Button } from '../components/atoms/Button'
import { Input } from '../components/atoms/Input'
import { FormField } from '../components/molecules/FormField'
import { Toggle } from '../components/atoms/Toggle'
import { ICONS } from '../components/atoms/Icons'

export const DevView = () => {
    const [config, setConfig] = useState({
        whatsapp_key: '',
        telegram_key: '',
        ocr_enabled: false
    });
    const [loading, setLoading] = useState(false);

    // Mock webhook URL based on supabase project
    const webhookUrl = "https://kkkwfimgkemxwgvqvaob.supabase.co/functions/v1/process-receipt";

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        const { data } = await supabase.from('app_config').select('*').single();
        if (data) {
            setConfig({
                whatsapp_key: data.whatsapp_api_key || '',
                telegram_key: data.telegram_api_key || '',
                ocr_enabled: data.ocr_enabled || false
            });
        }
    };

    const handleSave = async () => {
        setLoading(true);
        const { error } = await supabase.from('app_config').update({
            whatsapp_api_key: config.whatsapp_key,
            telegram_api_key: config.telegram_key,
            ocr_enabled: config.ocr_enabled
        }).eq('id', 1);

        if (error) alert('Error guardando configuración');
        else alert('Configuración guardada correctamente');
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <ICONS.Code /> Modo Desarrollador
                </h2>
                <p className="text-sm text-slate-500">Configuración avanzada de APIs y automatización.</p>
            </div>

            <Card className="p-6 space-y-6 border-l-4 border-l-blue-500">
                <h3 className="font-bold border-b border-slate-200 dark:border-slate-700 pb-2 flex justify-between">
                    <span>Webhook de Automatización</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">POST</span>
                </h3>
                <p className="text-sm text-slate-500">
                    Configura esta URL en Twilio (WhatsApp) o Telegram Bot Father para recibir los comprobantes automáticamente.
                </p>
                <div className="flex gap-2">
                    <Input readOnly value={webhookUrl} className="font-mono text-xs bg-slate-100 dark:bg-slate-900" />
                    <Button size="sm" variant="secondary" onClick={() => navigator.clipboard.writeText(webhookUrl)}>Copiar</Button>
                </div>
            </Card>

            <Card className="p-6 space-y-6">
                <h3 className="font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Integraciones de Mensajería</h3>
                <p className="text-sm text-slate-500">Configura las llaves de API para descifrar los mensajes.</p>

                <FormField label="WhatsApp API Key (Twilio/Meta)">
                    <Input type="password" value={config.whatsapp_key} onChange={e => setConfig({...config, whatsapp_key: e.target.value})} placeholder="Pegar token..." />
                </FormField>

                <FormField label="Telegram Bot Token">
                    <Input type="password" value={config.telegram_key} onChange={e => setConfig({...config, telegram_key: e.target.value})} placeholder="Pegar token de BotFather..." />
                </FormField>
            </Card>

            <Card className="p-6 space-y-6">
                <h3 className="font-bold border-b border-slate-200 dark:border-slate-700 pb-2">Inteligencia Artificial (OCR)</h3>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-slate-800 dark:text-white">Escaneo Automático de Comprobantes</p>
                        <p className="text-xs text-slate-500">Habilitar IA para leer banco, monto y referencia de imágenes recibidas.</p>
                    </div>
                    <Toggle checked={config.ocr_enabled} onChange={val => setConfig({...config, ocr_enabled: val})} />
                </div>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={loading}>{loading ? 'Guardando...' : 'Guardar Configuración'}</Button>
            </div>
        </div>
    );
};
