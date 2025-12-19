import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { Modal } from "@core/overlay/Modal";
import { Button } from "@core/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface SupportFormData {
  issue: string;
  description: string;
}

export const SupportModal = (props: Props) => {
  const { isOpen, onClose } = props;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SupportFormData>({
    defaultValues: {
      issue: "Olvidé mi contraseña",
      description: "",
    },
  });

  const supportIssue = useWatch({
    control,
    name: "issue",
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        issue: "Olvidé mi contraseña",
        description: "",
      });
    }
  }, [isOpen, reset]);

  const onSubmit = (data: SupportFormData) => {
    console.log("SupportModal Data:", data);
    const subject = encodeURIComponent(`Soporte Toro Group: ${data.issue}`);
    const bodyText =
      data.issue === "Otros" ? data.description : `Problema: ${data.issue}`;
    window.open(
      `mailto:josephbrachovillanueva2@gmail.com?subject=${subject}&body=${encodeURIComponent(
        bodyText,
      )}`,
    );
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Soporte Técnico">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <select
            className="w-full rounded border p-2 dark:bg-slate-800 dark:text-white"
            {...register("issue")}
          >
            <option>Olvidé mi contraseña</option>
            <option>Falla en software</option>
            <option>Otros</option>
          </select>
        </div>

        {supportIssue === "Otros" && (
          <div className="space-y-1">
            <textarea
              className="w-full rounded border p-2 dark:bg-slate-800 dark:text-white"
              rows={3}
              placeholder="Describe el problema..."
              {...register("description", {
                required: "Por favor describe el problema",
              })}
            />
            {errors.description && (
              <p className="text-xs text-rose-500">
                {errors.description.message}
              </p>
            )}
          </div>
        )}

        <Button className="w-full" type="submit">
          Enviar
        </Button>
      </form>
    </Modal>
  );
};
