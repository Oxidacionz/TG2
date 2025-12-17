import React, { useState, useEffect } from "react";
// Supabase removed
import { Card } from "../components/atoms/Card";
import { Button } from "../components/atoms/Button";
import { Input } from "../components/atoms/Input";
import { FormField } from "../components/molecules/FormField";
import { Toggle } from "../components/atoms/Toggle";
import { ICONS } from "../components/atoms/Icons";

export const DevView = () => {
  const [config, setConfig] = useState({
    whatsapp_key: "mock-wa-key",
    telegram_key: "mock-tg-key",
    ocr_enabled: true,
  });
  const [loading, setLoading] = useState(false);

  // Mock webhook URL based on supabase project
  const webhookUrl =
    "https://kkkwfimgkemxwgvqvaob.supabase.co/functions/v1/process-receipt";

  const fetchConfig = () => {
    // Config initialized in state
  };

  const handleSave = () => {
    setLoading(true);
    console.log("Mock Save Config:", config);
    alert("Configuración guardada correctamente (MOCK)");
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
          <ICONS.Code /> Modo Desarrollador
        </h2>
        <p className="text-sm text-slate-500">
          Configuración avanzada de APIs y automatización.
        </p>
      </div>

      <Card className="space-y-6 border-l-4 border-l-blue-500 p-6">
        <h3 className="flex justify-between border-b border-slate-200 pb-2 font-bold dark:border-slate-700">
          <span>Webhook de Automatización</span>
          <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
            POST
          </span>
        </h3>
        <p className="text-sm text-slate-500">
          Configura esta URL en Twilio (WhatsApp) o Telegram Bot Father para
          recibir los comprobantes automáticamente.
        </p>
        <div className="flex gap-2">
          <Input
            readOnly
            value={webhookUrl}
            className="bg-slate-100 font-mono text-xs dark:bg-slate-900"
          />
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigator.clipboard.writeText(webhookUrl)}
          >
            Copiar
          </Button>
        </div>
      </Card>

      <Card className="space-y-6 p-6">
        <h3 className="border-b border-slate-200 pb-2 font-bold dark:border-slate-700">
          Integraciones de Mensajería
        </h3>
        <p className="text-sm text-slate-500">
          Configura las llaves de API para descifrar los mensajes.
        </p>

        <FormField label="WhatsApp API Key (Twilio/Meta)">
          <Input
            type="password"
            value={config.whatsapp_key}
            onChange={(e) =>
              setConfig({ ...config, whatsapp_key: e.target.value })
            }
            placeholder="Pegar token..."
          />
        </FormField>

        <FormField label="Telegram Bot Token">
          <Input
            type="password"
            value={config.telegram_key}
            onChange={(e) =>
              setConfig({ ...config, telegram_key: e.target.value })
            }
            placeholder="Pegar token de BotFather..."
          />
        </FormField>
      </Card>

      <Card className="space-y-6 p-6">
        <h3 className="border-b border-slate-200 pb-2 font-bold dark:border-slate-700">
          Inteligencia Artificial (OCR)
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-slate-800 dark:text-white">
              Escaneo Automático de Comprobantes
            </p>
            <p className="text-xs text-slate-500">
              Habilitar IA para leer banco, monto y referencia de imágenes
              recibidas.
            </p>
          </div>
          <Toggle
            checked={config.ocr_enabled}
            onChange={(val) => setConfig({ ...config, ocr_enabled: val })}
          />
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Guardando..." : "Guardar Configuración"}
        </Button>
      </div>
    </div>
  );
};
