import { useEffect } from "react";
import { useForm } from "react-hook-form";

import FormField from "@core/form/FormField";
import Input from "@core/form/Input";
import Modal from "@core/overlay/Modal";
import { Button } from "@core/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rate: string) => void;
  currentRate: string;
}

interface RateFormData {
  rate: string;
}

export const EditRateModal = (props: Props) => {
  const { isOpen, onClose, onSave, currentRate } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RateFormData>({
    defaultValues: {
      rate: currentRate,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ rate: currentRate });
    }
  }, [isOpen, currentRate, reset]);

  const onSubmit = (data: RateFormData) => {
    console.log("EditRateModal Data:", data);
    onSave(data.rate);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Tasa Promedio Global"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-sm text-slate-500">
          Esta tasa se usará como referencia para cálculos rápidos en la
          aplicación.
        </p>
        <FormField label="Nueva Tasa (VES/$)" error={errors.rate?.message}>
          <Input
            type="number"
            step="0.01"
            placeholder="0.00"
            autoFocus
            {...register("rate", {
              required: "La tasa es requerida",
              min: { value: 0.01, message: "Debe ser mayor a 0" },
            })}
          />
        </FormField>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button type="submit">Guardar Nueva Tasa</Button>
        </div>
      </form>
    </Modal>
  );
};
