import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../atoms/Button";

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal = ({ isOpen, onClose }: SupportModalProps) => {
  const [supportIssue, setSupportIssue] = useState("Olvidé mi contraseña");
  const [supportDesc, setSupportDesc] = useState("");

  const handleSendSupport = () => {
    const subject = encodeURIComponent(`Soporte Toro Group: ${supportIssue}`);
    const bodyText =
      supportIssue === "Otros" ? supportDesc : `Problema: ${supportIssue}`;
    window.open(
      `mailto:josephbrachovillanueva2@gmail.com?subject=${subject}&body=${encodeURIComponent(
        bodyText,
      )}`,
    );
    onClose();
    // Reset state after closing if desired, or keep it.
    setSupportDesc("");
    setSupportIssue("Olvidé mi contraseña");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Soporte Técnico">
      <div className="space-y-4">
        <select
          className="w-full rounded border p-2 dark:bg-slate-800 dark:text-white"
          value={supportIssue}
          onChange={(e) => setSupportIssue(e.target.value)}
        >
          <option>Olvidé mi contraseña</option>
          <option>Falla en software</option>
          <option>Otros</option>
        </select>
        {supportIssue === "Otros" && (
          <textarea
            className="w-full rounded border p-2 dark:bg-slate-800 dark:text-white"
            rows={3}
            value={supportDesc}
            onChange={(e) => setSupportDesc(e.target.value)}
            placeholder="Describe el problema..."
          />
        )}
        <Button className="w-full" onClick={handleSendSupport}>
          Enviar
        </Button>
      </div>
    </Modal>
  );
};
