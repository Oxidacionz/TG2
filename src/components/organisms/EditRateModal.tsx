import { Button } from "../atoms/Button";
import { Input } from "../atoms/Input";
import { Modal } from "./Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  tempRate: string;
  setTempRate: (rate: string) => void;
}

export const EditRateModal = (props: Props) => {
  const { isOpen, onClose, onSave, tempRate, setTempRate } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Tasa Promedio Global"
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-500">
          Esta tasa se usará como referencia para cálculos rápidos en la
          aplicación.
        </p>
        <div>
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Nueva Tasa (VES/$)
          </label>
          <Input
            type="number"
            value={tempRate}
            onChange={(e) => setTempRate(e.target.value)}
            placeholder="0.00"
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onSave}>Guardar Nueva Tasa</Button>
        </div>
      </div>
    </Modal>
  );
};
